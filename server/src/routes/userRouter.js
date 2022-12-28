const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Router = require('koa-router');
const router = new Router();
const knex = require('../knex/knex.js');

// TODO: add middleware to be sure only certain roles + user can access this info
// get user ID
router.get('/api/user/:id', async ctx => {
    const user = await knex('users')
        .select({
            id: 'id',
            email: 'email'
        })
        .where('id', ctx.params.id)
        .first()
        .then((user) => {
            if(user) {
                return ctx.body = user;
            }
        })
        .catch((ctx) => {
            console.log(ctx, ' CTX');
            ctx.status = error.status || 500;
            ctx.body = { error: error.message || "Oh No! Something went wrong! " };
            ctx.app.emit('error', error, ctx);
        });
    if(!user) {
        return ctx.throw(400, 'User not found!');
    }
    return ctx.body = user;
});

// endpoint for signing in to the app
router.post('/api/user/signin', async ctx => {
    // check if user exists
    const result = await knex('users')
    .select('*')
    .where({
        'email' : ctx.request.body.email
    })
    .first()
    .then((user) => {
        console.log(user , 'RES USER');
        return user;
    })
    .catch((err) => {
        // TODO: have a single ERROR catch here
        console.error(err, ' eerrrrrrrrrrrrr');
    });

    // IF email is incorrect, throw 400
    if(!result) {
        return ctx.throw(400, 'Email not found');
    };
    
    // convert password to hash and compare to password in DB
    const pwdsMatch = await argon2.verify(result.password, ctx.request.body.password);

    // if pwds match and we know the user ID
    if(pwdsMatch && result.id){
        // create JWT token when user logs in
        const token = jwt.sign({user: result.id}, process.env.JWT_SECRET);
        // set cookie to keep track of logged in user
        const cookieInfo = { 
            httpOnly: true,
            sameSite: "lax"
        };
        if(process.env.NODE_ENV === 'production') {
            cookieInfo.secure = true;
        }
        
        // don't send password to client!
        // TODO: include user role in result when table gets added so we can redirect them to proper page
        delete result.password;

        // set cookie so we have a way to authenticate next calls!
        ctx.cookies.set('app_template_cookie', token, cookieInfo);
        
        // TODO: replace this with 0Auth or something more secure when we're going to do an enterprise app
        // https://www.passportjs.org/packages/passport-local/
        return ctx.body = {user: result};

        // below is how to GET the cookie we just set back...
        // console.log(ctx.cookies.get('app_template_cookie'), ' get cookies')
    } else {
        // tell user their password is wrong
        return ctx.throw(400, 'Incorrect Password');
    }
});

router.get("/api/super-secret-resource", async ctx => {
    return ctx.body = { message: "You need to be logged in to access this secret place" };
});

module.exports = router;