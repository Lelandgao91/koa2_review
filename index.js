const Koa = require("koa");
const fs = require("fs");
const app = new Koa();

/**
 * 用 Promise 封装异步读取文件方法
 * @param {string} page html 文件名称
 * @return {promise} 
 */
function render(page) {
    return new Promise((resolve, reject) => {
        let viewURL = `./view/${page}`
        fs.readFile(viewURL, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
/**
 * 根据 URL获取  HTML 内容
 * @param {string} url koa2 上下文url, ctx.url
 * @param {string} 获取html 文件内容 
 */
async function route(url) {
    let view = '404.html'
    switch (url) {
        case '/':
            view = 'index.html'
            break;
        case '/index':
            view = 'index.html'
            break;
        case '/todo':
            view = 'todo.html'
            break;
        case '/404':
            view = '404.html'
            break;
        default:
            break;
    }

    let html = await render(view)
    return html
}

app.use(async (ctx) => {
    let url = ctx.request.url
    let html = await route(url)
    ctx.body = html;
    ctx.type = "text/html;charset=utf-8"
    console.log(ctx.type)
})

app.listen(3000);

console.log('[demo] route-simple is starting at port 3000')