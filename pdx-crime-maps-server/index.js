const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.DB_PORT;

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});

app.get('/tweets', db.getTweets);

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});
