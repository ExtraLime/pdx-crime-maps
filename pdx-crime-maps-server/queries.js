const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const creds = require('./db-creds.json');

// console.log(process.env);

const pool = new Pool({
  user: creds.USER,
  host: creds.HOST,
  database: creds.DBNAME,
  password: creds.PASSWORD,
  port: creds.PORT,
  max : 5,
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 0
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

const getTweets = (request, response) => {
  pool.query('SELECT * FROM twitter_query LIMIT 5;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getTweets,
} 