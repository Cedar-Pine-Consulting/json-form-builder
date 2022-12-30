const Router = require('koa-router');
const router = new Router();
const knex = require('../../knex/knex.js');

// TODO: add middleware to be sure only certain roles + user can access this info
// get user ID
router.get('/api/formschema/:id', async ctx => {
    const formSchema = await knex('formschema')
        .select({
            id: 'id',
            schema: 'schema',
            uischema: 'uischema',
            name: 'name'
        })
        .where('id', ctx.params.id)
        .first()
        .then((formSchema) => {
            if(formSchema) {
                return ctx.body = formSchema;
            }
        })
        .catch((ctx) => {
            console.log(ctx, ' CTX');
            ctx.status = error.status || 500;
            ctx.body = { error: error.message || "Oh No! Something went wrong! " };
            ctx.app.emit('error', error, ctx);
        });
    if(!formSchema) {
        return ctx.throw(400, `formschema ${ctx.params.id} not found!`);
    }
    return ctx.body = formSchema;
});

router.post('/api/formschema/', async ctx => {
    console.log(ctx.request.body);
    const formSchema = await knex('formschema')
        .insert(ctx.request.body)
        .returning("*")
        .then((formSchema) => {
            return formSchema;
        })
        .catch((err) => {
            console.log(`api/formschema post unexpected error ${err}`);
        });
    if(!formSchema) {
        return ctx.throw(500, 'Could Not Create FormSchema');
    };
    return ctx.body = formSchema;
});


module.exports = router;
