import Order from "../models/orderModel.js";

// CREATE ORDER (Waiter/front desk)
const createOrder = async (req, res) => {
  try {
    const { tableNumber, items, orderType } = req.body;

    if (orderType === "dine-in" && !tableNumber) {
      return res.status(400).json({ msg: "Table number required" });
    }


    // 🔢 find last order of today
    const lastOrder = await Order.findOne({ orderDate: today })
      .sort({ orderNumber: -1 });

    const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const order = await Order.create({
      orderNumber: nextOrderNumber,
      orderType,
      tableNumber: orderType === "dine-in" ? tableNumber : null,
      items,
      createdBy: req.user.id,
    });

    await Order.sava()
    res.status(201).json({ msg: "Order created", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD ITEM TO ORDER (Waiter/front desk)
const addItemToOrder = async (req, res) => {
  try {
    const { id } = req.params; // orderId
    const { menuId, quantity } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (order.isPaid) {
      return res.status(400).json({ msg: "Cannot modify paid order" });
    }

    // 🔍 check if item already exists
    const existingItem = order.items.find(
      (item) => item.menuId.toString() === menuId
    );


    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      order.items.push({ menuId, quantity });
    }

    await order.save();
    res.json({ msg: "Item added", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ORDERS (Kitchen + Front Desk)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isPaid: false })
      .populate("items.menuId")
      .populate("createdBy", "name");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET SIGNLE ORDER (Front Desk)
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("items.menuId") 
      .populate("createdBy", "name role");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);

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
  addItemToOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
};