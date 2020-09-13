const mongoose = require("mongoose");
const db = require("./config/mongodb.js");
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
      log.error("MongoDB Disconnected due to app termination");
      //console.log("MongoDB Disconnected due to app termination");
      process.exit(0);
    });
  });
};
