import express from "express";
import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = express.Router(); // initilalize express router

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getSingleUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
