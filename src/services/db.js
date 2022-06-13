const { Pool } = require('pg')
/*
const pool = new Pool({
  user: 'postgres',
  database: 'wallets',
  password: '221096',
  port: 5432,
  host: 'localhost',
})
*/

//database productiva
const pool = new Pool({
  user: 'jolbhpluocrazi',
  password: 'fa908221e93758da916db844e67af351abd2476cb4417f7175895fdba23ab31d',
  database: 'd75n4f1ldd4vd2',
  port: 5432,
  host: 'ec2-52-204-195-41.compute-1.amazonaws.com',
  ssl: { rejectUnauthorized: false }
})
module.exports = { pool };
