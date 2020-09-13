const jwt = require("jsonwebtoken");
const log = require("./logger");

function generateAccessToken(user) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "120s",
  });
}

module.exports = {
  generateAccessToken: generateAccessToken,
};
