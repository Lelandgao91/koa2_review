const router = require("koa-router")();

// 判断是否登录中间件
async function isLoginUser(ctx, next) {
	if (!ctx.session.user) {
		ctx.flash = {warning: "为登录,请先登录"};
		return ctx.redirect("/signin");
	}
	await next();
}

// 判断权限
async function isAdmin(ctx, next) {
	console.log(ctx.session);
	if (!ctx.session.user) {
		ctx.flash = {warning: '未登录，请先登录'};
		return ctx.redirect('/signin');
	}
	if (!ctx.session.user.isAdmin) {
		ctx.flash = {warning: "没有权限"};
		return ctx.redirect("back")
	}
	await next();
}

module.exports = (app) => {
	// 首页
	router.get('/', require('./posts').index)

	// 登录注册
	router.get('/signup', require('./user').signup);
	router.post('/signup', require('./user').signup);
	router.get('/signin', require('./user').signin);
	router.post('/signin', require('./user').signin);
	// 登出
	router.get('/signout', require('./user').signout);

	// 文章
	router.get('/posts', require('./posts').index)
	router.get('/posts/:id', require('./posts').show)

	router.get('/posts/new', isLoginUser, require('./posts').create)
	router.post('/posts/new', isLoginUser, require('./posts').create)

	router.get('/posts/:id/edit', isLoginUser, require('./posts').edit)
	router.post('/posts/:id/edit', isLoginUser, require('./posts').edit)

	router.get('/posts/:id/delete', isLoginUser, require('./posts').destroy)

	app.use(router.routes());
	app.use(router.allowedMethods())
};
