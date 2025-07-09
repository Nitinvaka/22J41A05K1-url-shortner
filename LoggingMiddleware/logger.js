const fs = require('fs');
const path = require('path');

// Log file path
const logFile = path.join(__dirname, 'access.log');

// Custom logging middleware
function logRequests(req, res, next) {
  const now = new Date().toISOString();
  const logLine = `${now} | ${req.method} ${req.originalUrl} | IP: ${req.ip}\n`;

  fs.appendFile(logFile, logLine, (err) => {
    if (err) {
    }
  });

  next();
}
module.exports = logRequests;