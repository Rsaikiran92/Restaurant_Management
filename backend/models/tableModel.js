import mongoose from "mongoose";

const tableModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available","occupied","reserved"],
      required: true,
    }
  },
  { timestamps: true },
);

export default mongoose.model("Table", tableModel);