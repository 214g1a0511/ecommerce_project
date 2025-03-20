const crypto = require("crypto");
function generateID() {
  const id = crypto.randomUUID();
//   console.log(id);
  return id;
}

module.exports = { generateID };
