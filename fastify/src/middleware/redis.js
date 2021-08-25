const Redis = require("ioredis");
const config = require("../config/config.default");

const { cacheType, addrs, options } = config.redis;

const redisClient =
  cacheType === "redis_cluster"
    ? new Redis.Cluster(addrs, options)
    : new Redis(addrs[0], options);

redisClient.on("error", function(e) {
  console.log("redis error: ", e);
});

redisClient.on("connect", function() {});
redisClient.on("ready", function() {});
redisClient.on("end", function() {});

module.exports = redisClient;
