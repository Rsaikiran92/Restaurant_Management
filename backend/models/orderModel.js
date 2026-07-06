import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerNumber:{
      type: String,
      required:true
    },
    orderNumber: {
      type: Number,
      required:true
    },
    orderDate: {
      type: String, // YYYY-MM-DD
      required:true
    },
    orderTime:{
      type:String,
      required:true
    },
    orderType: {
      type: String,
      enum: ["dine-in", "takeaway"],
      required: true,
    },
    tableNumber: {
      type: String
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
          enum: ["waiting", "preparing", "ready", "served"],
          default: "waiting",
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
