module.exports = {
  redis: {
    cacheType: "redis_cluster",
    addrs: [
      {
        host: "10.184.24.181",
        port: 6379
      }
    ],
    options: {
      keyPrefix: "my-fastify"
    }
  },
  mysql: {
    host: "10.184.24.181",
    port: 3306,
    database: "fastify_mysql",
    user: "fastify",
    password: "123456"
  },
  mongodb: {
    host: "10.184.24.181",
    port: 27017,
    database: "fastify_mongo",
    user: "fastify",
    password: "123456"
  },
  elasticsearch: {
    host: "10.184.24.181",
    port: 9200,
    log: "trace"
  }
};
