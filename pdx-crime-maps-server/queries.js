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

// graph uses this if crime = All *change to however many tweets you want to show when all is selected
const getStolenVehicleTweets = (request, response) => {
  pool.query("with t1 as (select count(location),location from twitter_query where entity like 'Portland Police log' and category like 'VEHICLE STOLEN' group by location order by 1 desc limit 6) select * from t1 where location NOT IN ('Unknown');", (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
    
  })
}

const getCrimeTweets = (request, response) => {
  const crime = request.params.crime;
  pool.query(`with t1 as (select count(location),location from twitter_query where entity like 'Portland Police log' and category like '${crime}' group by location order by 1 desc limit 6) select * from t1 where location NOT IN ('Unknown');`, (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)

  })
}

const getAllMapTweets = (request, response) => {
  pool.query("SELECT * FROM twitter_query limit 100", (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
    
  })
}


module.exports = {
  getStolenVehicleTweets,
  getAllMapTweets,
  getCrimeTweets,
} 