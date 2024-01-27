// Import the 'express' module and retrieve the router from the configuration
const { express } = require('../src/config');
// Create an Express router instance
const router = express.Router();
// Import the database connection and Socket.IO manager
const db = require('../src/database');
const ioManager = require('../src/socket');
// Retrieve the initialized Socket.IO instance
const io = ioManager.getIO();

// Define a route to handle GET requests to the root endpoint ('/')
router.get('/', (req, res) => {
    // Define the SQL query to retrieve data from the 'Counter' table
    const sql = 'SELECT * FROM Counter';

    // Execute the SQL query using the database connection
    db.query(sql, (err, results) => {
        // Handle any errors that may occur during the database query
        if (err) {
            console.error('Error executing query:', err);
            // Send a 500 Internal Server Error response to the client
            res.status(500).send('Internal Server Error');
            return;
        }

        // Emit the overall view count to all connected clients using Socket.IO
        io.emit('counterViews', results[0].looked_overall);

        // Render the 'index' view, passing data to be displayed on the page
        res.render('index', { pageTitle: 'Home', counter: results });
    });
});

// Export the router for use in other parts of the application
module.exports = router;