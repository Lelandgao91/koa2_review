const UserModel = require("../models/user");

module.exports = {
    async signup(ctx,next){
        const user = {
            name:"admin",
            email:"450523639@qq.com",
            password:"admin"
        },
        const result = await UserModel.create(user)
        ctx.body = result
    }
}
