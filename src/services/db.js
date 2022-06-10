const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  database: 'wallets',
  password: '221096',
  port: 5432,
  host: 'localhost',
})

module.exports = { pool };
