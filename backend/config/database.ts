import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};