const path = require("path");

function generateFileName(originalName) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  let id = "";
  for (let i = 0; i < 21; i++) {
    const index = Math.floor(64 * Math.random());
    id += alphabet[index];
  }

  return id + path.extname(originalName);
}

module.exports = generateFileName;