import { Router } from "express";
import { createUser, getAllUsers, getSingleUser, deleteUser, updateUser } from "../user/users.controllers";

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;