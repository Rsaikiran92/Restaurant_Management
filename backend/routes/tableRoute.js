import express from "express";
import  { createTable, getTables, updateTable, deleteTable } from "../controllers/tableController.js"
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const tableRouter = express.Router();


tableRouter
.post("/", auth, isAdmin, createTable)
.put("/:id", auth, isAdmin, updateTable)
.delete("/:id", auth, isAdmin, deleteTable)
.get("/", auth, getTables);

export default tableRouter