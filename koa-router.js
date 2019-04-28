const Koa = require("koa");
const fs = require("fs");

const app = new Koa();
const Router = require("koa-router");

let home = new Router()

home.get('/',async (ctx) => {
    let html = `
        <ul>
            <li></li>
        </ul> 
    `
})