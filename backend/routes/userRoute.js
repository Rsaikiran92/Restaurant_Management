import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js"


const userRouter = express.Router();


userRouter
.post("/",createUser)
.get("/", auth, isAdmin, getUsers)
.put("/:id", auth, isAdmin, updateUser)
.delete("/:id", auth, isAdmin, deleteUser);

export default userRouter