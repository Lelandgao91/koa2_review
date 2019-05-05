const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
	if (ctx.url == '/index') {
		ctx.cookies.set('cid', 'hello world', {
			domain: "localhost",
			path: "/index",
			maxAge: 10 * 60 * 1000,
			expires: new Date('2019-6-1'),
			httpOnly: false,
			overwrite: false
		})
		ctx.body = "cookie is ok"
	} else {
		ctx.body = "cookie is error"
	}
})

app.listen(3000,()=>{
	console.log('[demo] cookie is staring at port 3000');
})


