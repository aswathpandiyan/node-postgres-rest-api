const mongoose = require("mongoose");
const db = require("./config/mongodb.js");
module.exports = () => {
  mongoose
    .connect(db.URL, db.options)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error in database connection", err);
    });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("MongoDB Disconnected due to app termination");
      process.exit(0);
    });
  });
};
