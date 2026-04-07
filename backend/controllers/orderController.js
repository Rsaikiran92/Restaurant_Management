import Order from "../models/orderModel.js";

// CREATE ORDER (Waiter)
const createOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    const order = await Order.create({
      tableNumber,
      items,
      createdBy: req.user.id,
    });

    res.status(201).json({ msg: "Order created", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ORDERS (Kitchen + Front Desk)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.menuId")
      .populate("createdBy", "name role");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS (Kitchen)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createOrder,
  getOrders,
  updateOrderStatus,
};