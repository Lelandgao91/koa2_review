const Koa =require("koa");
const app = new Koa();

app.use( async (ctx) =>{
    ctx.body = 'hello koa1212321312331232'
})

app.listen(3000);

console.log("[demo] start quick is starting ai port 3000");
