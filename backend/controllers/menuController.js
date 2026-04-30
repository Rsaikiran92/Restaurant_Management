import Menu from "../models/menuModel.js";

// CREATE MENU ITEM
const createMenu = async (req, res) => {
  try {
    await Menu.create(req.body);
    const menu = await Menu.find();
    res.status(201).json({ msg: "Menu item created", menu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL MENU ITEMS
const getMenus = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE MENU ITEM
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const menu = await Menu.find();
    res.json({ msg: "Menu item edited", menu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE MENU ITEM
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);
    const menu = await Menu.find();
    res.json({ msg: "Menu deleted", menu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createMenu, getMenus, updateMenu, deleteMenu };
