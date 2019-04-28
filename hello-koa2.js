const Koa =require("koa");
const app = new Koa();

app.use( async (ctx) =>{
    ctx.body = 'hello koa1232'
})

app.listen(3000);

console.log("[demo] start quick is starting ai port 3000");
