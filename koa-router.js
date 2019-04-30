const Koa = require("koa");
const fs = require("fs");

const app = new Koa();
const Router = require("koa-router");

let home = new Router()

home.get('/', async (ctx) => {
	let html = `
        <ul>
            <li><a href="/view/index">/view/index</a></li>
            <li><a href="/view/404">/view/404</a></li>    
        </ul>
`
	ctx.body = html;
})

let page = new Router();

page.get('/404', async (ctx) => {
	ctx.body = '404 page!'
}).get('/index', async (ctx) => {
	ctx.body = "index page"
})

let router = new Router()

router.use('/', home.routes(), home.allowedMethods())
router.use('/view', page.routes(), page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
	console.log('[demo] route-use-middleware is starting at port 3000');
})









