const Koa = require("koa");
const Router = require("@koa/router");
const requireDirectory = require("require-directory");
const bodyParser = require("koa-bodyparser"); // 解决ctx.request.body获取不到body内容的问题
const parameter = require('koa-parameter');
const logger = require('koa-logger')

const catchError = require("./app/middleware/catch-error"); // 全局异常处理
const httpResponse = require("./app/utils/http-response");

const app = new Koa();
parameter(app); 

app.use(logger()).use(bodyParser()).use(catchError);
//静态资源
app.use(require('koa-static')(__dirname + '/static'));

// 路由自动注册
requireDirectory(module, "./app/router", {
  visit: (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes());
    }
  },
});

// 全局变量
global.$res = httpResponse;

app.listen(3000);
