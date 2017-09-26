const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const api = require("./api/api");

router.get("/block_search", async (ctx) => {
    let param = ctx.request.url.split("?")[1];
    let answer;
    if (answer = await api.search(param)) {
        ctx.status = 200;
        ctx.body = answer;
    } else {
        console.log(answer);
        ctx.status = 500;
        ctx.body = "We have a problem!!!!";
    }

});

router.get("/add_new", async (ctx) => {

    ctx.status = 200;
    ctx.body = await api.search(param);
});


app.use(async function (ctx, next) {
    console.log("req url : " + ctx.request.url);
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8082);