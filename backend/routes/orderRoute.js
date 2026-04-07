import express from "express";
import {createOrder,  getOrders,  updateOrderStatus} from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Waiter
orderRouter
.post("/", auth, createOrder)

// Kitchen + Frontdesk
.get("/", auth, getOrders)

// Kitchen updates
.put("/:id", auth, updateOrderStatus);

export default orderRouter