'use strict';
// Imports
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const path = require('path');
const {getNewAccessToken} = require('../StoryHub-Modified-Backend/utils/getNewAccessToken')
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes')
const userRoutes = require('./routes/userRoutes')



const globalErrorHandler = require('./errors/errorHandler');
const AppError = require('./errors/appError');
const association = require('./associations/association');
const cors = require('cors')
// Creating the express app
const app = express();

// Parsing JSON and Cookies
app.use(helmet())
app.use(cookieParser())
app.use(cors());

app.use(express.json({ limit: '1000kb' }));

app.use(morgan('dev'));
app.use(xssClean());

app.use(express.static(__dirname + '/public/media/'));
app.use('/api/v1/stories', storyRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/token', getNewAccessToken);


app.get('/api/v1', (req, res) => {
  res.send('Welcome to home page!');
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}
else {
  app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
}

app.use(globalErrorHandler)

// Exporting the app
module.exports = app;
