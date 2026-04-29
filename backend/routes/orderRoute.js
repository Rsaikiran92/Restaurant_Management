import express from "express";
import {createOrder,addItemToOrder,    getOrders,getSingleOrder,  updateOrderStatus} from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Waiter + Frontdesk
orderRouter
.post("/", auth, createOrder)

// Waiter + Frontdesk
.put("/:id/add-item", auth, addItemToOrder)

// Kitchen + Frontdesk
.get("/", auth, getOrders)

//Frontdesk
.get("/", auth, getSingleOrder)

// Kitchen updates
.put("/:id", auth, updateOrderStatus);

export default orderRouter