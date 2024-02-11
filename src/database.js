const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// Create table and insert data upon initialization
db.query(`
  CREATE TABLE IF NOT EXISTS Counter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    looked_overall INT DEFAULT 0,
    tapped_overall INT DEFAULT 0
  )
`, (error, results, fields) => {
  if (error) {
    console.error('Error creating Counter table:', error);
  } else {
    console.log('Counter table created or already exists');
    // Insert data with default values
    db.query(`
      INSERT INTO Counter (looked_overall, tapped_overall)
      VALUES (0, 0)
    `, (insertError, insertResults, insertFields) => {
      if (insertError) {
        console.error('Error inserting data into Counter table:', insertError);
      } else {
        console.log('Default data inserted into Counter table');
      }
    });
  }
});

module.exports = db;
