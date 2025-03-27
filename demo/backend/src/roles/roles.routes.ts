import { Router } from "express";
import { createRole, getAllRoles, getSingleRole, deleteRole, updateRole } from "./roles.controllers";

const router = Router();

router.post("/roles", createRole);
router.get("/roles", getAllRoles);
router.get("/roles/:id", getSingleRole);
router.delete("/roles/:id", deleteRole);
router.put("/roles/:id", updateRole);

export default router;