const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const dotenv = require('dotenv');
dotenv.config();
const port = 5431;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});
app.get('/api/neighborhood/inithood', cors(corsOptions), db.getStartHood);
app.get('/api/initcrime', cors(corsOptions), db.getInitCrimeTweets);
app.get('/api/map-tweets', cors(corsOptions), db.getAllMapTweets);
app.get('/api/:crime', cors(corsOptions), db.getCrimeTweets);
app.get('/api/neighborhood/:hood', cors(corsOptions), db.getHoodTweets);
app.get('/api/choro/chorodata', cors(corsOptions), db.getInitChoroTweets);
app.get('/api/choro/:crime', cors(corsOptions), db.getChoroTweets);



app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});