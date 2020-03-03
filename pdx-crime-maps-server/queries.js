const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max : 5,
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 0
})

async function getTweets(req, res) {
    try {
      const readAllQuery = 'SELECT * FROM twitter_query';
      const { rows } = await pool.query(readAllQuery);
      return res.send({ rows });
    } catch (error) {
      return res.send(error);
    }
}

module.exports = {
  getTweets,
} 