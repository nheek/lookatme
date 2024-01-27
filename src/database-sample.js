// Rename this file to database.js
// Import the 'mysql2' module, which provides MySQL database connectivity
const mysql = require('mysql2');

// Create a database pool to manage and reuse database connections
const db = mysql.createPool({
  connectionLimit: 10,  // Set the maximum number of simultaneous connections
  host: '127.0.0.1',    // Database server address (localhost in this case)
  user: 'your-database-username',  // Replace with your MySQL database username
  password: 'your-database-password',  // Replace with your MySQL database password
  database: 'your-database-name',  // Replace with the name of your MySQL database
});

// Export the created database pool for use in other parts of the application
module.exports = db;