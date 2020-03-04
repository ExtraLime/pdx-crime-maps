const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();



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

const pool = new Pool({
  user: 'extralime',
  host: '35.225.164.144',
  database: 'pdxcrime',
  password: 'pdx-crime',
  port: 5432,
  max : 5,
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 0
})



const client = new Client({
  user: 'extralime',
  host: '35.225.164.144',
  database: 'pdxcrime',
  password: 'pdx-crime',
  port: 5432})
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
const result = client.query({text:'SELECT * FROM twitter_query LIMIT 5;', rowMode:'array'}, (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})

console.log(result.rows)
