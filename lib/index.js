// Connect to the server using Socket.IO
const socket = io.connect("/", {
  secure: true,
  transports: ["polling", "websocket"],
});

// Listen for updates on the number of active userss
socket.on("activeUsers", (users) => {
  // Update the displayed count of users currently looking
  document.getElementById("looking-right-now").textContent = users.length;
});

// Listen for updates on the overall view counter
socket.on("counterViews", (newCounterValue) => {
  document.getElementById("looked-overall").textContent = newCounterValue;
});

// Listen for updates on the overall tap counter
socket.on("counterTaps", (newCounterValue) => {
  // Update the UI to reflect the new overall tap count
  document.getElementById("tapped-overall").textContent = newCounterValue;
});

// Wrap asynchronous code in an immediately invoked async function
(async () => {
  try {
    // Send a POST request to update the view counter on the server
    const response = await fetch("/api/update-counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (response.ok) {
      // Parse the response JSON and perform any UI updates or actions
      const result = await response.json();
    } else {
      // Log an error if the request was not successful
      console.error("Error updating counter:", response.statusText);
    }
  } catch (error) {
    // Log any errors that occur during the request
    console.error("Error updating counter:", error.message);
  }
})();

// Define an asynchronous function to update the tap counter
async function updateTapCounter() {
  try {
    // Send a POST request to update the tap counter on the server
    const response = await fetch("/api/update-tap-counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      console.error("Error updating counter:", response.statusText);
      // If the request fails, revert the UI update (optional)
      document.getElementById("tapped-overall").textContent = currentCount;
      alert("Failed to update tap counter. Please try again.");
    }
  } catch (error) {
    console.error("Error updating counter:", error.message);
    // Revert the UI update if there was an error
    document.getElementById("tapped-overall").textContent = currentCount;
    alert("An error occurred while updating the tap counter.");
  }
}

