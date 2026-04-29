import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });

    await user.save();
    const users = await User.find();
    res.status(201).json({ msg: "User created", users });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
   
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    const users = await User.find();
    res.status(201).json({ msg: "User created", users });
    // res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    const users = await User.find();
    res.json({ msg: "User deleted", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createUser, getUsers, updateUser, deleteUser };
