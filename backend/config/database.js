const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
