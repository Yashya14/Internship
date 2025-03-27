const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join(__dirname, "../database/roles.json");

const getAllRoles = (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    // console.log(data);
    const roles = JSON.parse(data).roles;
    res.json(roles);
  });
};

const getRoleById = (req, res) => {
  // const userId = Number(req.params.id);
  // console.log(userId);
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    const roles = JSON.parse(data).roles;
    const singleRole = roles.filter((role) => role.id === req.params.id);

    if (singleRole.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    console.log(singleRole);
    res.json(singleRole);
  });
};

const createRole = (req, res) => {
  const newRole = req.body;
  newRole.id = uuidv4();

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    const db = JSON.parse(data);
    db.roles.push(newRole);
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write data" });
      }
      res.status(201).send("Role Added Successfully!");
    });
  });
};

const updateRole = (req, res) => {
  const updatedRole = req.body;
  console.log(updatedRole);

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    const db = JSON.parse(data);

    const roleIndex = db.roles.findIndex((r) => r.id === req.params.id);
    if (roleIndex === -1) {
      return res.status(404).json({ error: "Role not found" });
    }

    db.roles[roleIndex] = { ...db.roles[roleIndex], ...updatedRole };
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write data" });
      }
      res.send("Role Updated Successfully!");
    });
  });
};

const deleteRole = (req, res) => {
    const roleId = req.params.id;
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db = JSON.parse(data);
        const roleIndex = db.roles.findIndex(r => r.id === roleId);
        if (roleIndex === -1) {
            return res.status(404).json({ error: 'Role not found' });
        }
        db.roles.splice(roleIndex, 1);
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.status(200).send("Role Deleted Successfully!");
        });
    });
};

module.exports = { getAllRoles, getRoleById, createRole, updateRole,deleteRole };
