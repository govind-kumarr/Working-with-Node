const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "V@govind12",
});

module.exports = pool.promise();
