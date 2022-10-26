const Router = require("@koa/router");
const router = new Router();
const axios = require("axios");


// 测试
router.get("/test", async (ctx, next) => {
  global.$res.success('test');
});

// 天气- 测试网络请求
router.get("/weather", async (ctx, next) => {
  const weather= await axios.get("https://query.asilu.com/weather/baidu")
  global.$res.success(weather.data);
});

router.post("/validate", async (ctx, next) => {
  const { name } = ctx.request.body;
  ctx.verifyParams({
    name: 'string'
  });
  global.$res.success(name);
});

module.exports = router;
