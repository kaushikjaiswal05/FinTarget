const fs = require("fs");
const path = require("path");

async function queue(user_id) {
  const logMessage = `${user_id}-task completed at-${new Date().toISOString()}\n`;
  console.log(logMessage);
  const logFilePath = path.join(__dirname, "logs", "task.log");
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
    }
  });
}

module.exports = queue;
