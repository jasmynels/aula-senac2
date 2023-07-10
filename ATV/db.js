const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "jasmy",
  password: "1234",
  database: "node",
  port: 5432,
});
if (pool) {
  console.log("banco conectado");
}

module.exports = pool;

//fiz com postgress :p
