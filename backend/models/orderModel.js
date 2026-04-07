import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
    },
    items: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        quantity: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "preparing", "ready", "served"],
          default: "pending",
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
