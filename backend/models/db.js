const mongoose = require("mongoose");

const connectToDB = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((error) => {
      console.log("Mongo db error\n", error);
      throw error;
    });
};

module.exports = connectToDB;
