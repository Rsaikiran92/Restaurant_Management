import Order from "../models/orderModel.js";

// CREATE ORDER (Waiter/front desk)
const createOrder = async (req, res) => {
  try {
    // if (orderType === "dine-in" && !tableNumber) {
    //   return res.status(400).json({ msg: "Table number required" });
    // }

    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const time = today.toLocaleTimeString();

    // 🔢 find last order of today
    const lastOrder = await Order.findOne({ orderDate: date }).sort({
      orderNumber: -1,
    });
    const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const order = await Order.create({
      ...req.body,
      orderNumber: nextOrderNumber,
      orderDate: date,
      orderTime: time,
      createdBy: req.user.id,
    });

    await order.populate([
      {
        path: "items.menuId",
      },
      {
        path: "createdBy",
        select: "name",
      },
    ]);

    const io = req.app.get("io");
    io.emit("newOrder", order);

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
      (item) => item.menuId.toString() === menuId,
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
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const orders = await Order.find({ isPaid: false, orderDate: date })
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
    const { itemId, status } = req.body;
    const order = await Order.findOneAndUpdate(
      {
        _id: id,
        "items._id": itemId,
      },
      {
        $set: {
          "items.$.status": status,
        },
      },
      {
        new: true,
      },
    );
    if (status == "ready") {
      const io = req.app.get("io");
      io.emit("itemStatus", order);
    }
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
