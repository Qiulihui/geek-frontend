const mysql = require("mysql2");
const config = require("../config/config.default");
const { host, port, database, user, password } = config.mysql;
const mysqlConnection = mysql.createConnection({
  host,
  port,
  database,
  user,
  password
});

mysqlConnection.connect();

module.exports = mysqlConnection;
