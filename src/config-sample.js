// Rename this to config.js
// Import the 'express' module for creating an Express application
const express = require('express');
// Import 'express-session' for session management
const session = require('express-session');
// Import 'compression' for response compression middleware
const compression = require('compression');
// Import 'express-rate-limit' for rate limiting middleware
const rateLimit = require('express-rate-limit');

// Create an Express application instance
const app = express();

// Use 'express-session' middleware for managing user sessions
app.use(session({
    // Set a secret key for session encryption (replace with your own secure secret)
    secret: 'add-your-own-long-and-secure-secret-key-here',
    resave: false, // Do not save sessions that have not been modified
    saveUninitialized: true, // Save new sessions even if they haven't been modified
}));

// Use 'compression' middleware for compressing responses before sending them to clients
app.use(compression());

// Export the 'express', 'app', 'rateLimit', and 'session' for use in other parts of the application
module.exports = { express, app, rateLimit, session };