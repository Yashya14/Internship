import { Router } from "express";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/roles.controllers";

const router = Router();

router.get("/roles", getAllRoles);
router.post("/roles", createRole);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

export default router;