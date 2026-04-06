import express from "express";
import { loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

// LOGIN
authRouter.post("/login", loginUser);

export default authRouter