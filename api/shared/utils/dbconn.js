const mysql = require('mysql2/promise');

exports.connection = async () => {
  return await mysql.createConnection({
    host: process.env.API_DB_HOST,
    user: process.env.API_DB_USER,
    password: process.env.API_DB_PASS,
    database: process.env.API_DB_NAME
  });
};
