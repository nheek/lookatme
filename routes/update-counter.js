// Import the ioManager from socket.js to manage Socket.IO connections
const ioManager = require("../src/socket");
// Retrieve the singleton instance of Socket.IO from ioManager
const io = ioManager.getIO();
// Import necessary modules and configurations
const { express } = require("../src/config");
// Create an Express router to handle specific routes
const router = express.Router();
// Import the database connection module
const { db } = require("../src/database");

// Define a route to handle POST requests to the root endpoint ('/')
router.post("/", async (req, res) => {
  try {
    // Check if a user is already logged in; if yes, return a forbidden status
    if (req.session.user) {
      return res.status(403).send("Forbidden");
    }

    // Define the SQL query to increment the 'looked_overall' counter in the 'Counter' table
    const updateSql = `UPDATE "Counter" SET looked_overall = looked_overall + 1`;

    // Execute the SQL query using the database connection
    await db.query(updateSql);

    // Set the user session to 'Guest' to mark them as visited
    req.session.user = "Guest";

    // Define a SQL query to retrieve the updated 'looked_overall' value
    const selectSql = `SELECT looked_overall FROM "Counter"`;

    // Execute the SQL query to get the updated counter value
    const { rows: selectResults } = await db.query(selectSql);

    // Emit the updated 'looked_overall' value to all connected clients using Socket.IO
    io.emit("counterViews", selectResults[0].looked_overall);

    // Respond with a JSON indicating success and a message
    res.json({ success: true, message: "Counter updated successfully" });
  } catch (err) {
    // Handle any errors that may occur during the database query or processing
    console.error("Error updating counter:", err);
    // Send a 500 Internal Server Error response to the client
    res.status(500).send("Internal Server Error");
  }
});

// Export the router for use in other parts of the application
module.exports = router;
