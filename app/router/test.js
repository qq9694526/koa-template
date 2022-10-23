const Router = require("@koa/router");
const router = new Router();

// 生成token
router.get("/test", async (ctx, next) => {
  global.$res.success();
});

module.exports = router;
