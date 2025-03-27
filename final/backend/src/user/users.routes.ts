import { Router } from "express";
import { getAllUsers, getSingleUser, deleteUser, updateUser, registerUser, loginUser, changePassword } from "../user/users.controllers";
import authMiddleware from '../middlewares/authMiddleware';
import checkPermissions from '../middlewares/checkPermissions';

const router = Router();

router.post('/register', authMiddleware, checkPermissions(['add_user']), registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);
// router.post("/users", checkPermissions(['add_user']), createUser);
router.get("/users", authMiddleware, checkPermissions(['view_user']), getAllUsers);
router.get("/users/:id", authMiddleware, getSingleUser);
router.delete("/users/:id", authMiddleware, checkPermissions(['delete_user']), deleteUser);
router.put("/users/:id", authMiddleware, checkPermissions(['edit_user']), updateUser);

export default router;  