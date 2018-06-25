'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const path = require('path');

require('dotenv').config();

const {PORT, DATABASE_URL, TEST_DATABASE_URL, CLIENT_ORIGIN} = require('./config'); 

const {app, runServer, closeServer} = require('./serverConnection');

const {courseCatalogRouter} = require('./courseCatalogRouter');

const {acadPlanRouter} = require('./acadPlanRouter');

mongoose.Promise = global.Promise

const cors = require('cors');

// Logging
app.use(morgan('common'));

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors({
	origin: CLIENT_ORIGIN
}));

//course catalog router
app.use('/', courseCatalogRouter);

//student academic plan router
app.use('/', acadPlanRouter);

//User authenticatio
const { router: usersRouter } = require('./userauth/users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./userauth/auth');
// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/', usersRouter);
app.use('/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});


//Requests made to non-existent endpoint
app.use('*', function(req, res) {
	res.status(404).json({message: 'Not Found'});
});


//run server
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};