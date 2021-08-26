const redisClient = require("../middleware/redis");
const mysqlconnection = require("../middleware/mysql");
// const mongodb = require("../middleware/mongodb");
const elasticsearchClient = require("../middleware/elasticsearch");
const User = require("../entity/user");

const EXPIRE = 3600;

const getRedis = async (ctx, next) => {
  try {
    let token = await redisClient.get("fastify:token");
    if (!token) {
      token = +new Date();
      await redisClient.set("fastify:token", token, "EX", EXPIRE);
    }
    ctx.response.body = token;
  } catch (e) {
    console.log(e);
  }
};

const mysqlOperation = sql => {
  return new Promise((resolve, reject) => {
    mysqlconnection.query(sql, function(err, res) {
      if (err) {
        reject();
      }
      resolve(res);
    });
  });
};
const getMysql = async (ctx, next) => {
  const { name, age } = ctx.request.body;
  try {
    const sql = `INSERT INTO readers(name, age) VALUES (${name}, ${age})`;
    await mysqlOperation(sql);
    ctx.response.body = token;
  } catch (e) {
    console.log(e);
  }
};

const addUser2Mongo = async (ctx, next) => {
  const { name, age } = ctx.request.body;
  try {
    const user = new User({
      name,
      age,
      created_time: +new Date(),
      updated_time: +new Date()
    });
    await user.save();
    ctx.response.body = "create user success";
  } catch (e) {
    console.log(e);
  }
};

const add2Elasticsearch = async (ctx, next) => {
  const { id, name, age } = ctx.request.body;
  try {
    const res = await elasticsearchClient.create({
      index: "my_user",
      type: "user",
      id,
      body: {
        name,
        age
      }
    });
    ctx.response.body = res.hits.hits;
  } catch (e) {
    console.log(e);
  }
};

const getElasticsearch = async (ctx, next) => {
  const { name } = ctx.request.query;
  try {
    const res = await elasticsearchClient.search({
      index: "my_user",
      type: "user",
      body: {
        query: {
          name
        }
      }
    });
    ctx.response.body = res.hits.hits;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  "GET /redis": getRedis,
  "GET /mysql": getMysql,
  "POST /mongo/add": addUser2Mongo,
  "GET /elasticsearch": getElasticsearch,
  "POST /elasticsearch/add": add2Elasticsearch
};
