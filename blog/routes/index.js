const router = require("koa-router")();
module.exports = (app) => {
	// 首页
    router.get('/', require('./home').index);
	// 登录注册
	router.get('/signup', require('./user').signup);
	router.post('/signup', require('./user').signup);

	router.get('/signin', require('./user').signin);
	router.post('/signin', require('./user').signin);
	// 登出
	router.get('/signout', require('./user').signout);

	// 文章
	router.get('/',require('posts').index);
	router.get("/posts",require('./posts').index);

	router.get("/posts/new",require('./posts').create)
	router.post("/posts/new",require('./posts').create)

	router.get("/posts/:id", require("./posts").show);

	router.get("/posts/:id/edit", require('./posts').edit);
	router.post("/posts/:id/edit", require('./posts').edit);
	router.get("/posts/:id/delete", require('./posts').destroy);

    app.use(router.routes());
    app.use(router.allowedMethods())
};
