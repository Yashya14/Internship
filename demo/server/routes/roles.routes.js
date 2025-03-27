const express = require("express");
const { getAllRoles,getRoleById,createRole, updateRole, deleteRole } = require("../controllers/roles.controllers");

const router = express.Router();

router.get("/roles", getAllRoles);
router.post("/roles", createRole);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

module.exports = router;