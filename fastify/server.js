const Koa = require("koa");
const app = new Koa();
const controllers = require("./src/middleware/controller");

const port = process.env.PORT || 9000;

// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "http://10.192.245.123:5000");
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
//   );
//   ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//   ctx.set("Access-Control-Allow-Credentials", true);

//   if (ctx.method == "OPTIONS") {
//     ctx.body = 200;
//   } else {
//     await next();
//   }
// });

app.use(controllers(__dirname + "/src/routes"));

app.listen(port, () => {
  console.log("app start at: ", port);
});
