const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const creds = require('./db-creds.json');
const { newGeo } = require('./newGeo.js');
const geo = require('./data/geo-json.json');

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
const getInitCrimeTweets = (request, response) => {
  pool.query("with t1 as (select count(location),location from twitter_query where entity like 'Portland Police log' group by location order by 1 desc limit 6) select * from t1 where location NOT IN ('Unknown');", (error, results) => {
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
  pool.query("SELECT * FROM twitter_query order by tweet_id desc limit 100", (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
    
  })
}

const getHoodTweets = (request, response) => {
  console.log(request.params)
  const hood = request.params.hood;
  pool.query(`with t1 as (select count(category),category from twitter_query where entity like 'Portland Police log' and location like '${hood}' group by category order by 1 desc limit 5) select * from t1 where category NOT IN ('Unknown');`, (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)

  })
}

const getStartHood = (request, response) => {
  pool.query("select count(category), category from twitter_query where entity like 'Portland Police log' group by category order by 1 desc limit 5;", (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)

  })
}

const getInitChoroTweets = (request, response) => {
  pool.query(`with t1 as (select count(location),location from twitter_query  where entity like 'Portland Police log' group by location order by 1 desc )  select * from t1 where location NOT IN ('Unknown')`, (error, results) => {
    if (error) {
      throw error
    }    
    const result = results.rows
    const formatted = newGeo(geo, result)
    
    response.status(200).json(formatted)
    // console.log(formatted);

  })
}

const getChoroTweets = (request, response) => {
  const crime = request.params.crime;
  pool.query(`with t1 as (select count(location),location from twitter_query  where entity like 'Portland Police log' and category like '${crime}' group by location order by 1 desc )  select * from t1 where location NOT IN ('Unknown')`, (error, results) => {
    if (error) {
      throw error
    }
    const result = results.rows;
    const formatted = newGeo(geo, result)
    console.log(formatted.features[0].properties);

    
    response.status(200).json(formatted)

  })
}

module.exports = {
  getInitCrimeTweets,
  getAllMapTweets,
  getCrimeTweets,
  getHoodTweets,
  getStartHood,
  getInitChoroTweets,
  getChoroTweets,
} 