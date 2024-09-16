const { v4: uuidv4 } = require("uuid");

function generateShortUUID() {
    return uuidv4().replace(/-/g, '').substring(0, 8); // Remove hyphens and take the first 8 characters
}

module.exports = generateShortUUID