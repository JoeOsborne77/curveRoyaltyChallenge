const mongoose = require("mongoose");
const dbURL = "mongodb://0.0.0.0/curveroyaltytest";

const connectToDb = () => {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connected to database");
  });
};

module.exports = connectToDb;
