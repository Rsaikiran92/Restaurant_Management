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
    const { id } = req.params;
    const items  = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (order.isPaid) {
      return res.status(400).json({ msg: "Cannot modify paid order" });
    }

    for (const newItem of items) {
      const existingItem = order.items.find(
        (item) => item.menuId.toString() === newItem.menuId
      );

      if (existingItem && existingItem.status=="waiting") {
        existingItem.quantity += newItem.quantity;
      } else {
        order.items.push({
          menuId: newItem.menuId,
          quantity: newItem.quantity,
        });
      }
    }

    await order.save();

    const today = new Date();
    const date = today.toISOString().split("T")[0];
     const query = {
      isPaid: false,
      orderDate: date,
    };

    // Waiters can only see their own orders
    if (req.user.role === "waiter") {
      query.createdBy = req.user.id;
    }
    const orders = await Order.find(query)
      .populate("items.menuId")
      .populate("createdBy", "name");

    res.json({
      msg: "Items added successfully",
      order: orders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET ALL ORDERS (Kitchen + Front Desk)
const getOrders = async (req, res) => {
  try {
    const today = new Date();
    const date = today.toISOString().split("T")[0];
     const query = {
      isPaid: false,
      orderDate: date,
    };

    // Waiters can only see their own orders
    if (req.user.role === "waiter") {
      query.createdBy = req.user.id;
    }
    const orders = await Order.find(query)
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
    const order=await Order.findOneAndUpdate(
      {
        _id: id,
        "items._id": itemId,
      },
      {
        $set: {
          "items.$.status": status,
        },
      }
    );
  
   const today = new Date();
    const date = today.toISOString().split("T")[0];
     const query = {
      isPaid: false,
      orderDate: date,
    };

    // Waiters can only see their own orders
    if (req.user.role === "waiter") {
      query.createdBy = req.user.id;
    }
    
    const orders = await Order.find(query)
      .populate("items.menuId")
      .populate("createdBy", "name");
    const io = req.app.get("io");
    io.emit("itemStatus", orders);
  
    res.json(orders);
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
