import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "dessert"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Menu", menuSchema);

