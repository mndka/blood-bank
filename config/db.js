const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to db ${mongoose.connection.host}`.green);
  } catch (error) {
    console.log(`Mongoose db error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
