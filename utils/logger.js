const fs = require("fs");
const path = require("path");

// Define log file path
const logFilePath = path.join(__dirname, "../logs.txt");

// Function to log events
const logEvent = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    // Append log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        }
    });

    console.log(logMessage.trim()); // Also log to the console
};

module.exports = logEvent;
