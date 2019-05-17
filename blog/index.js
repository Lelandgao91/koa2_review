const Koa = require("koa"),
  path = require("path"),
  views = require("koa-views"),
  static = require('koa-static'),
  router = require('./routes'),
  session = require("koa-session"),
  CONFIG = require("./config/config"),
  flash = require('./middlewares/flash'),
  mongoose = require("mongoose"),
  bodyParser = require("koa-bodyparser"),
  app = new Koa();

// 模板引擎
app.use(views(path.join(__dirname, 'views'), {
	map: {
		html: "nunjucks"
	}
}));
// 处理 post 请求
app.use(bodyParser());

app.use(async (ctx, next) => {
	ctx.state.ctx = ctx
	// ctx.state.marked = marked
	await next()
})


// mongoose 操作 mongodb
mongoose.connect(CONFIG.mongodb);
// 处理静态资源
const staticPath = './public'
app.use(static(path.join(__dirname, staticPath)))


app.keys = ['leland'];

app.use(session({
	key: CONFIG.session.key,
	maxAge: CONFIG.session.maxAge
}, app))

app.use(flash())

router(app);

if (!module.parent) app.listen(CONFIG.port)
