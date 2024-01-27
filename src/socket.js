// Create a Set to store active user IDs
const activeUsers = new Set();

// Declare a variable to store the Socket.IO instance
let io;

// Module exports
module.exports = {
  // Function to initialize Socket.IO with specified configurations
  initialize: function(http) {
    // Create a Socket.IO instance attached to the provided HTTP server
    io = require('socket.io')(http, {
      transports: ['websocket', 'polling'],
      pingInterval: 10000,
      pingTimeout: 5000,
    });

    // Event handler for a new socket connection
    io.on('connection', (socket) => {
      // Add the new socket ID to the activeUsers set if not present
      if (!activeUsers.has(socket.id)) {
        activeUsers.add(socket.id);
        // Emit the updated list of active users to all connected clients
        io.emit('activeUsers', Array.from(activeUsers));
      }

      // Event handler for socket disconnection
      socket.on('disconnect', () => {
        // Remove the disconnected socket ID from the activeUsers set
        activeUsers.delete(socket.id);
        // Emit the updated list of active users to all connected clients
        io.emit('activeUsers', Array.from(activeUsers));
      });
    });

    // Return the initialized Socket.IO instance (optional)
    return io;
  },
  // Function to get the initialized Socket.IO instance
  getIO: function() {
    // Throw an error if the Socket.IO instance is not initialized
    if (!io) {
      throw new Error("socket.io not initialized!");
    }
    // Return the initialized Socket.IO instance
    return io;
  },
  // Export the activeUsers Set (optional)
  activeUsers: activeUsers
};