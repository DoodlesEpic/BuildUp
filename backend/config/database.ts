import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (process.env.MONGO_URI) {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database ${mongoose.connection.name}`);
  }

  throw new Error("MONGO_URI must be defined");
};
