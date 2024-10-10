const express = require("express");
const session = require("express-session");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(compression());

module.exports = { express, app, rateLimit, session };
