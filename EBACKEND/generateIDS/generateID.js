const crypto = require("crypto");
function generateID() {
  const id = crypto.randomUUID();
  return id;
}

module.exports = { generateID };
