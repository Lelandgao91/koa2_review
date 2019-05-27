const bcrypt = require("bcryptjs"),
  UserModel = require("../models/user"),
  PostModel = require('../models/post');

module.exports = {
	async index (ctx, next) {
		const username = ctx.params.username
		const user = await UserModel.findOne({ name: username })
		if (!user) {
			return ctx.throw(404, '没有该用户')
		}
		const posts = await PostModel.find({ author: user._id }, { content: 0 })
		await ctx.render('user', { user, posts })
	},
	async signup(ctx, next) {
		if (ctx.method === 'GET') {
			await ctx.render('signup', {
				title: '用户注册'
			})
			return
		} else if (ctx.method === 'POST') {
			// 生成 salt
			const salt = await bcrypt.genSalt(10)
			console.log(ctx.request.body);
			let {name, email, password} = ctx.request.body;
			// 对密码进行加密
			password = await bcrypt.hash(password, salt)
			const user = {
				name,
				email,
				password,
			}
			// 储存到数据库
			const result = await UserModel.create(user)
			ctx.body = result;
		}
	},

	async signin(ctx, next) {
		if (ctx.session.user) {
			ctx.flash = {warning: '已登录'}
			ctx.redirect('back')
			return
		}
		if (ctx.method === 'GET') {
			await ctx.render('signin', {
				title: '用户登录'
			})
			return
		}
		const {name, password} = ctx.request.body
		const user = await UserModel.findOne({name})
		if (user && await bcrypt.compare(password, user.password)) {
			ctx.session.user = {
				_id: user._id,
				name: user.name,
				isAdmin: user.isAdmin,
				email: user.email
			}
			ctx.flash = {success: '登录成功'}
			ctx.redirect('/')
		} else {
			ctx.flash = {warning: '用户名或密码错误'}
			ctx.redirect('back')
		}

	},
	// 登出
	async signout(ctx, next) {
		ctx.session.user = null
		ctx.flash = { warning: '退出成功' }
		ctx.redirect('/')
	}
};
