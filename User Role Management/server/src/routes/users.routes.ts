import { Router } from "express";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from "../controllers/users.controllers";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;