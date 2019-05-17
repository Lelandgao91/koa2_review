const Koa = require("koa"),
  path = require("path"),
  views = require("koa-views"),
  serve = require('koa-static'),
  router = require('./routes'),
  config = require("./config/config"),
  app = new Koa();


app.use(views(path.join(__dirname, 'views'), {
    map: {
        html: "nunjucks"
    }
}));


router(app);

mongoose.connect(config.mongodb);

app.use(serve(path.join(__dirname, 'pubilc')));



app.listen(3000, () => {
    console.log('server is runing at port 3000');
})
