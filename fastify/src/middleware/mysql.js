const mysql = require("mysql2");
const config = require("../config/config.default");
const { host, port, database, user, password } = config.mysql;
const connection = mysql.createConnection({
  host,
  port,
  database,
  user,
  password
});

connection.connect();

module.exports = connection;
