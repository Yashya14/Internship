const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const usersData = require("../database/users.json");
const rolesData = require("../database/roles.json");
const assignmentsData = require("../database/assignUserRole.json");

const dbPath = path.join(__dirname, "../database/assignUserRole.json");

// Assign a role to a user
const assignUserRole = (req, res) => {
  const { userId, roleId } = req.body;
  // Check if user and role exist
  const user = usersData.users.find((u) => u.id === userId);
  const role = rolesData.roles.find((r) => r.id === roleId);

  if (!user || !role) {
    return res.status(400).json({ message: "User or Role not found" });
  }

  // Add the assignment
  const assignment = {
    user_id: userId,
    role_id: roleId,
    firstName: user.firstName,
    lastName: user.lastName,
    roleName: role.roleName,
    assigned_at: new Date().toLocaleString(),
    id: uuidv4(),
  };

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    const db = JSON.parse(data);
    db.assignUserRole.push(assignment);

    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write data" });
      }
      res.status(201).send("Assign Role To User Successfully!");
    });
  });

  res.status(200).send("Assign Role To User Successfully!");
  res.status(200).json({
    message: `Role ${role.roleName} assigned to user ${user.firstName} ${user.lastName}`,
  });
};

// Get all assign user roles
const getAllUserRoles = (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    // console.log(data);
    const assignmentsData = JSON.parse(data);
    // console.log(assignmentsData);
    res.status(200).json(assignmentsData);
  });
};

// delete assign user role
const deleteAssignUserRole = (req, res) => {
  const { id } = req.params;
  console.log(id);

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    const db = JSON.parse(data);
    console.log(db);
    const assignUserRoleIndex = db.assignUserRole.findIndex((u) => u.id === id);

    if (assignUserRoleIndex === -1) {
      return res.status(404).json({ error: "Role assignment not found" });
    }

    db.assignUserRole.splice(assignUserRoleIndex, 1);
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write data" });
      }
      res.status(200).send("Assign Role to User Deleted Successfully!");
    });
  });
};

// update assign user role
const editUserRole = (req, res) => {
  const { id } = req.params;
  console.log("params : ",id);
  const { userId, roleId } = req.body;
  console.log("body : ",userId, roleId);

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    const db = JSON.parse(data);
    const assignmentIndex = db.assignUserRole.findIndex((assignId) => assignId.id === id);

    if (assignmentIndex === -1) {
      return res.status(404).json({ error: "Role assignment not found" });
    }


    const user = usersData.users.find((u) => u.id === userId);
    const role = rolesData.roles.find((r) => r.id === roleId);

    if (!user || !role) {
      return res.status(400).json({ message: "User or Role not found" });
    }

    db.assignUserRole[assignmentIndex] = {
      ...db.assignUserRole[assignmentIndex],
      user_id: userId,
      role_id: roleId,
      firstName: user.firstName,
      lastName: user.lastName,
      roleName: role.roleName,
      assigned_at: new Date().toLocaleString(),
    };

    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write data" });
      }
      res.status(200).send("Assign Role To User Updated Successfully!");
    });
  });
};


module.exports = { assignUserRole, getAllUserRoles, deleteAssignUserRole,editUserRole };
