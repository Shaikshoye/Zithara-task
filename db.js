const { Pool } = require('pg');

const pool = new Pool({
  user: 'shoyeb',
  password: 'shoyeb',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'zithara'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};