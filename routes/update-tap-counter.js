// Import the ioManager from socket.js, which manages the Socket.IO instance
const ioManager = require('../src/socket');
// Get the singleton io instance from the ioManager
const io = ioManager.getIO();
// Import necessary dependencies and configurations
const { express } = require('../src/config');
const router = express.Router();
const { db } = require('../src/database');

// In-memory variables to track tap counter and timeout
let tapCounter = 0; 
let tapTimeout;

// Define a route to handle POST requests
router.post('/', (req, res) => {
    try {
        // Increment the in-memory tap counter
        tapCounter += 1;
        
        // Clear the existing timeout (if any)
        clearTimeout(tapTimeout);

        // Set a new timeout for database update after 1 second (adjust as needed)
        tapTimeout = setTimeout(async () => {
            // Update the database counter with the tapped count
            const updateSql = 'UPDATE Counter SET tapped_overall = tapped_overall + ?';
            const selectSql = 'SELECT tapped_overall FROM Counter';

            // Execute the update query
            await db.query(updateSql, [tapCounter]);

            // Query the updated counter value from the database
            const [selectResults] = await db.query(selectSql);

            // Emit the updated counter value to all connected clients
            io.emit('counterTaps', selectResults[0].tapped_overall);
          
            // Reset the in-memory tap counter after updating the database
            tapCounter = 0;

            // Respond with a JSON indicating success and a message
            res.json({ success: true, message: 'Counters updated successfully' });
        }, 1000); // 1 second delay (adjust as needed)

    } catch (err) {
        // Handle errors
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router for use in other parts of the application
module.exports = router;