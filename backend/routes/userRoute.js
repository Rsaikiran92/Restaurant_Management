import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getProfile,
} from "../controllers/userController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js"


const userRouter = express.Router();


userRouter
.post("/",createUser)
.get("/", auth, isAdmin, getUsers)
.get("/profile",auth,getProfile)
.put("/:id", auth, isAdmin, updateUser)
.delete("/:id", auth, isAdmin, deleteUser);

export default userRouter