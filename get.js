const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
	let url = ctx.url;
	let request = ctx.request;
	let req_query = request.query;
	let req_querystring = request.querystring;
	// 上下文中直接获取
	let ctx_query = req_query;
	let ctx_querystring = req_querystring;

	ctx.body = {
		url,
		req_query,
		req_querystring,
		ctx_query,
		ctx_querystring
	}
});

app.listen(3000,()=>{
	console.log('[demo] request get is starting at port 3000');
});
