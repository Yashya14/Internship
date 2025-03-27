import { Router } from "express";
import { createRole, getAllRoles, getSingleRole, deleteRole, updateRole } from "./roles.controllers";
import authMiddleware from '../middlewares/authMiddleware';
import checkPermissions from '../middlewares/checkPermissions';

const router = Router();

router.post("/roles", authMiddleware, checkPermissions(['add_role']), createRole);
router.get("/roles", authMiddleware, checkPermissions(['view_role']), getAllRoles);
router.get("/roles/:id", authMiddleware, checkPermissions(['view_role']), getSingleRole);
router.delete("/roles/:id", authMiddleware, checkPermissions(['delete_role']), deleteRole);
router.put("/roles/:id", authMiddleware, checkPermissions(['edit_role']), updateRole);

export default router;