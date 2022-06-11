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

//databse productiva
const pool = new Pool({
  user: 'jolbhpluocrazi',
  database: 'd75n4f1ldd4vd2',
  password: 'fa908221e93758da916db844e67af351abd2476cb4417f7175895fdba23ab31d',
  port: 5432,
  host: 'ec2-52-204-195-41.compute-1.amazonaws.com',
})

module.exports = { pool };
