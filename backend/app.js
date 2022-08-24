//import npm installed packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');// import route files

const { environment } = require('./config');
const isProduction = environment === 'production';// variable will be true if environment is set to production

const app = express(); // initialize express

app.use(morgan('dev'));// connect morgan middleware for logging info about req and res

app.use(cookieParser());// middleware for parsing cookies
app.use(express.json());// middleware for parsing JSON bodies of requests with content-type of application/json

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes); // Connect all the routes

module.exports = app; // export the app
