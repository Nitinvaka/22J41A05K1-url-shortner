const { v4: uuidv4 } = require('uuid');

// Generates a 6-character shortcode
function createShortcode() {
  return uuidv4().replace(/-/g, '').substring(0, 6);
}

// Checks if a string is a valid URL
function isValidUrl(link) {
  try {
    new URL(link);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = { createShortcode, isValidUrl };
