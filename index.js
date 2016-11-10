// dot env
require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Set default static assets folder
app.use(express.static(path.join(__dirname, 'public')));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Modular routes

// import router for our API
const apiPuppiesRouter = require('./routes/api/puppies');

// map our apiRouter to the '/api' route
app.use('/api/puppies', apiPuppiesRouter);

app.listen(PORT, () => {
  console.log('woof! 🐶');
});
