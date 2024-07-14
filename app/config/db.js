
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'margaritasdesignbd.integrador.xyz',
  user: 'sammy',
  password: 'passw0rd',
  database: 'DM_DB',
});

module.exports = pool;
