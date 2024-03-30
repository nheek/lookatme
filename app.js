// Import necessary modules and configurations
const path = require('path');
const { express, app, rateLimit } = require('./src/config');
const http = require('http').createServer(app);
const ioManager = require('./src/socket');

// Initialize Socket.IO and get the initialized instance
ioManager.initialize(http);
const io = ioManager.getIO();

// Routes should be here because io has to be initalised first
const indexRoute = require('./routes/index');
const counterRoutes = require('./routes/update-counter');
const tapCounterRoutes = require('./routes/update-tap-counter');

// Serve static files (public, lib, and node_modules directories)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, '/lib'), {
  'extensions': ['js'],
  'setHeaders': (res, path) => {
    res.setHeader('Content-Type', 'application/javascript');
  }
}));
app.use('/static', express.static('node_modules'));

// Attach route handlers for updating counters via Socket.IO
app.use('/api/update-counter', counterRoutes);
app.use('/api/update-tap-counter', tapCounterRoutes);

// Configure Express settings
app.set('trust proxy', 1);
app.set('view engine', 'ejs');

// Attach the index route after limiter middleware
app.use('/', indexRoute); // Serve the index route

// Error handling middleware to catch and log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set up the server to listen on the specified port
const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the initialized Socket.IO instance and Express for external use
module.exports = { io, express };