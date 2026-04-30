import Table from "../models/tableModel.js";

// CREATE table
const createTable = async (req, res) => {
  console.log(req.body)
  try {
    await Table.create(req.body);
    
    const table = await Table.find();
    res.status(201).json({ msg: "Table item created", table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL Table ITEMS
const getTables = async (req, res) => {
  try {
    const table = await Table.find();
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Table ITEM
const updateTable = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTable = await Table.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const table = await Table.find();
    res.json({ msg: "Table item edited", table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Table ITEM
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    await Table.findByIdAndDelete(id);
    const table = await Table.find();
    res.json({ msg: "Table deleted", table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createTable, getTables, updateTable, deleteTable };
