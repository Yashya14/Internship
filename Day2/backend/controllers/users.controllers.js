// import { v4 as uuid } from "uuid";
import User from "../models/UserModal.js";

// let users = [];

//! create a new user
export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(400).send({ msg: "User data not found" });
    }

    const savedData = await userData.save();
    console.log(savedData);
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send({ error: error, msg: "Failed to add user" });
  }
};

//! get all users
export const getUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).send({ msg: "Users not found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ error: error, msg: "Failed to get users" });
  }
};

// ! get single user
export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ error: error, msg: "Failed to get user" });
  }
};

//! update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).send({ msg: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedData, msg: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error, msg: "Failed to update user" });
  }
};

//! delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).send({ msg: "User not found" });
    }

    const deletedData = await User.findByIdAndDelete(id);
    res.status(200).send({ deletedData, msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error, msg: "Failed to delete user" });
  }
};

// get all users
// export const getUsers = (req, res) => {
//   res.send(users);
// };

// create a new user or to add new user
// export const createUser = (req, res) => {
//   const user = req.body;
//   users.push({ ...user, id: uuid() });
//   res.send("User added successfully");
// };

// // get single user
// export const getUser = (req, res) => {
//   const singleUser = users.filter((user) => user.id === req.params.id);
//   res.send(singleUser);
// };

// // delete user
// export const deleteUser = (req, res) => {
//   users = users.filter((user) => user.id !== req.params.id);
//   res.send("User deleted successfully");
// };

// // update user
// export const updateUser = (req, res) => {
//   const user = users.find((user) => user.id === req.params.id);
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.contact = req.body.contact;
//   user.gender = req.body.gender;
//   user.role = req.body.role;
//   user.skills = req.body.skills;

//   res.send("User updated successfully");
// };
