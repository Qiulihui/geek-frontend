const elasticsearch = require("elasticsearch");
const config = require("../config/config.default");
const { host, port, log } = config.elasticsearch;

const client = new elasticsearch.Client({
  host: host + ":" + port,
  log
  // apiVersion: "7.2"
});

module.exports = client;
