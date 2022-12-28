const fs = require('fs');
const koaStatic = require('koa-static');

// path to the react app build folder to serve minified app
const FRONTEND_BUILD_PATH = `${__dirname}/../../client/build`;

function shouldServeIndexHtml(path) {
    if (path === '/index.html') {
        return true;
    }
    // Avoid handling /api/* and paths containing . (potentially file requests), and health check
    return ((!path.startsWith('/api') && !path.includes('.')) && path !== '/health');
}

module.exports = () => async (ctx, next) => {
    await koaStatic(FRONTEND_BUILD_PATH)(ctx, () => {
        // If static file not found...
        if (shouldServeIndexHtml(ctx.path)) {
            ctx.type = 'html';
            ctx.body = fs.createReadStream(`${FRONTEND_BUILD_PATH}/index.html`);
            return;
        }

        // not handled. then go on as usual...
        return next();
    });
};
