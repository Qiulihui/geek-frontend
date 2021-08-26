const mongose = require("mongoose");
const config = require("../config/config.default");
const { host, port, database, user, password } = config.mongodb;
const url = `mongodb://${user}:${password}@${host}:${port}/${database}`;
mongose.connect(url);

mongose.connection.on("connected", function() {
  console.log("mongo connect success");
});

mongose.connection.on("error", function() {
  console.log("mongo connect error");
});

mongose.connection.on("disconnected", function() {
  console.log("mongo connect disconnected");
});

module.exports = mongose;
