const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const api = require("./api/api");

router.get("/block_search", async (ctx) => {
    let param = ctx.request.url.split("?")[1];
    ctx.status = 200;
    ctx.body = api.search(param);
});

/*app.use(async(ctx, next) => {
s try {
 await next();
 } catch (e) {
 ctx.body = JSON.stringify({message: e.message});
 ctx.status = 500;
 }
 });*/

//app.use(require("koa-convert")(serve('./app/public')));
app.use(async function (ctx, next) {
    console.log("req url : " + ctx.request.url);
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8082);