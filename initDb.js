const Pool = require("pg");
const db = require("./config/postgres.js");
const log = require("./helper/logger");

module.exports = () => {
  mongoose
    .connect(db.URL, db.options)
    .then(() => {
      log.info("Connected to MongoDB");
    })
    .catch((err) => {
      log.error("Error in database connection", err);
    });

  mongoose.connection.on("error", (err) => {
    log.error(err);
  });
  mongoose.connection.on("disconnected", () => {
    log.warn("MongoDB Disconnected");
  });
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};
