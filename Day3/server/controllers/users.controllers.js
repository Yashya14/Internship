import { v4 as uuid } from "uuid";

let users = [];

// get all users
export const getUsers = (req, res) => {
  res.send(users);
};

// create a new user or to add new user
export const createUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuid() });
  res.send("User added successfully");
};

// get single user
export const getUser = (req, res) => {
  const singleUser = users.filter((user) => user.id === req.params.id);
  res.send(singleUser);
};

// delete user
export const deleteUser = (req, res) => {
  users = users.filter((user) => user.id !== req.params.id);
  res.send("User deleted successfully");
};

// update user
export const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.contact = req.body.contact;
  user.gender = req.body.gender;
  user.role = req.body.role;
  user.skills = req.body.skills;

  res.send("User updated successfully");
};
