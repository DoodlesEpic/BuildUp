import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please provide a note title"],
    },
    content: {
      type: String,
      require: [true, "Please provide a note text"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
