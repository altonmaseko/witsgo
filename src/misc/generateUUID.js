const { v4: uuidv4 } = require("uuid");
// Function to generate a short UUID
function generateShortUUID() {
    return uuidv4().replace(/-/g, '').substring(0, 8); // Remove hyphens and take the first 8 characters
}

module.exports = generateShortUUID