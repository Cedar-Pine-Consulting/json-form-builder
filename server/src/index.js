require('dotenv').config();

const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
const router = new Router();
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const errorHandler = require('./middleware/errorHandler.js');
const serveReactApp = require('./middleware/serveReactApp.js');


// ----------- Initialize Sentry -------------------
// Initalize Sentry
// const Sentry = require('@sentry/node');
// Sentry.init({
//     dsn: process.env.SENTRY_DSN,
//     environment: process.env.ENV || 'local',
// });

// ----------- Custom Middleware -------------------

// need body parsing middleware, up limit for cases like images/docs
app.use(bodyParser({ textLimit: '30mb' }));

// log for easier debugging
app.use(logger());

// middleware
app.use(errorHandler);


// routes
const healthRouter = require('./routes/healthRouter.js');
const userRouter = require('./routes/userRouter.js');


// ------------ Route Definitions -----------------------------

app.use(healthRouter.routes());
app.use(userRouter.routes());


// error handler via sentry once you set up a personal account
// app.on('error', (err, ctx) => {
    // log error with sentry
    // Sentry.withScope(function(scope) {
    //     scope.addEventProcessor(function(event) {
    //         return Sentry.Handlers.parseRequest(event, ctx.request);
    //     });
    //     Sentry.captureException(err);
    // });
    // console.log(err);
// })

// serve react app on / route
app.use(serveReactApp());
app.use(router.allowedMethods());

// get data from env vars for port & env
const PORT = process.env.PORT ? process.env.PORT : 3001;
const env = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`listening on ${PORT} on ${env}`);
});
