const fs = require("fs");
const koaBody = require("koa-body");

const addMapping = (router, mapping) => {
  for (const url in mapping) {
    if (url.startsWith("GET")) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith("POST")) {
      const path = url.substring(5);
      // 使用ctx.body解析中间件: koaBody
      router.post(path, koaBody({ multipart: true }), mapping[url]);
    } else if (url.startsWith("PUT")) {
      const path = url.substring(4);
      // 使用ctx.body解析中间件: koaBody
      router.put(path, koaBody({ multipart: true }), mapping[url]);
    } else {
      console.log(`invalid url:${url}`);
    }
  }
};

const addControllers = (router, controllersDir) => {
  const files = fs.readdirSync(controllersDir);
  const js_files = files.filter(f => {
    return f.endsWith(".js");
  });
  for (const f of js_files) {
    let mapping = require(controllersDir + "/" + f);
    addMapping(router, mapping);
  }
};

module.exports = dir => {
  let controller_dir = dir || __ + "..“ + /routes";
  const router = require("koa-router")();
  addControllers(router, controller_dir);
  return router.routes();
};
