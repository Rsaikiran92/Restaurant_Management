import express from "express";
import { createMenu, getMenus, updateMenu, deleteMenu } from "../controllers/menuController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const menuRouter = express.Router();

// Admin Only
menuRouter
.post("/", auth, isAdmin, createMenu)
.put("/:id", auth, isAdmin, updateMenu)
.delete("/:id", auth, isAdmin, deleteMenu)

// Logged-in users
.get("/", auth, getMenus);

export default menuRouter
