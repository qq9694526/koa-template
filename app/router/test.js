const Router = require("@koa/router");
const router = new Router();
const axios = require("axios");
const path = require("path");
let ejs = require("ejs");

router.get("/", async (ctx, next) => {
  const file = path.join(__dirname, "../../static/test.json");
  ejs.renderFile(file, { name: "测试丫" }, {}, function (err, str) {
    // str => 输出渲染后的 HTML 字符串
    console.log("err", err);
    console.log("str", str);
    global.$res.success(JSON.parse(str));
  });
});

// 测试
router.get("/test", async (ctx, next) => {
  global.$res.success("test");
});

// 天气- 测试网络请求
router.get("/weather", async (ctx, next) => {
  const weather = await axios.get("https://query.asilu.com/weather/baidu");
  global.$res.success(weather.data);
});

router.post("/validate", async (ctx, next) => {
  const { name } = ctx.request.body;
  ctx.verifyParams({
    name: "string",
  });
  global.$res.success(name);
});

module.exports = router;
