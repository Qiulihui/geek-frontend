const Koa = require('koa');
const app = new Koa();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('app start at: ', port)
});