const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test the connection
const testConnection = async () => {
  try {
    const client = await db.connect();
    console.log('Connected to PostgreSQL database successfully');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error connecting to PostgreSQL database', error);
  }
};

testConnection();


module.exports = { db };
