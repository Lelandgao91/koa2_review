const PostModel = require('../models/post')
module.exports = {
	async create(ctx, next) {
		if (ctx.method === 'GET') {
			await ctx.render('create', {
				title: "新建文章"
			})
			return
		} else if (ctx.method === 'POST') {
			const post = Object.assign(ctx.request.body, {
				author: ctx.session.user._id
			})
			const res = await PostModel.create(post)
			ctx.flash = {success: "发表文章成功"}
			ctx.redirect(`/posts/${res._id}`)
		}
	},
	async show(ctx,next){
		const post = await PostModel.findById(ctx.params.id)
		  .populate({ path: 'author', select: 'name'})
		await ctx.render('post',{
			title: post.title,
			post,
			comments
		})
	}
}
