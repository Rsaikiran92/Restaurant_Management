import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "waiter", "kitchen", "frontdesk"]
  }
});

export default mongoose.model("User", userSchema);