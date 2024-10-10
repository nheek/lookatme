// Import the ioManager from socket.js, which manages the Socket.IO instance
const ioManager = require("../src/socket");
// Get the singleton io instance from the ioManager
const io = ioManager.getIO();
// Import necessary dependencies and configurations
const { express } = require("../src/config");
const router = express.Router();
const { db } = require("../src/database");

// In-memory variables to track tap counter and timeout
let tapCounter = 0;
let tapTimeout;

// Define a route to handle POST requests
// Inside your POST route
router.post("/", (req, res) => {
  try {
    tapCounter += 1;
    clearTimeout(tapTimeout);

    tapTimeout = setTimeout(async () => {
      try {
        // Update the database
        const updateSql = `UPDATE "Counter" SET tapped_overall = tapped_overall + $1`;
        await db.query(updateSql, [tapCounter]);

        // Emit the updated value immediately
        const selectSql = `SELECT tapped_overall FROM "Counter"`;
        const { rows: selectResults } = await db.query(selectSql);
        io.emit("counterTaps", selectResults[0].tapped_overall);
        
        // Reset tapCounter
        tapCounter = 0;
        res.json({ success: true, message: "Counters updated successfully" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).send("Internal Server Error");
      }
    }, 1000); // 1 second delay
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});


// Export the router for use in other parts of the application
module.exports = router;
