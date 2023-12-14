const mongoose = require("mongoose");

require("dotenv").config();

const connetDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connetDB;
