const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

pool.connect((error, client, release) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    return;
  }
  console.log("Connected to PostgreSQL database");
  release();
})

module.exports = pool;

