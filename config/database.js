const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASENAME,
  });
  
  db.connect((error) => { 
      if (error) {
        console.error('Error connecting to the database ',error.message);
        return;
      }
      console.log('Connected to the database');
    });
  
  module.exports = db;