import { readFile, readFileSync, writeFile } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from 'express';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
}

interface Role {
    id: string;
    roleName: string;
    [key: string]: any;
}

interface Assignment {
    user_id: string;
    role_id: string;
    firstName: string;
    lastName: string;
    roleName: string;
    assigned_at: string;
    id: string;
}

interface Database {
    users: User[];
    roles: Role[];
    assignUserRole: Assignment[];
}

const usersData: Database = JSON.parse(readFileSync(join(__dirname, "../database/users.json"), "utf8"));
const rolesData: Database = JSON.parse(readFileSync(join(__dirname, "../database/roles.json"), "utf8"));
const assignmentsData: Database = JSON.parse(readFileSync(join(__dirname, "../database/assignUserRole.json"), "utf8"));

const dbPath = join(__dirname, "../database/assignUserRole.json");

const assignUserRole = (req: Request, res: Response, next: NextFunction): void => {
  const { userId, roleId } = req.body;
  const user = usersData.users.find((u: User) => u.id === userId);
  const role = rolesData.roles.find((r: Role) => r.id === roleId);

  if (!user || !role) {
    res.status(400).json({ message: "User or Role not found" });
    return;
  }

  const assignment: Assignment = {
    user_id: userId,
    role_id: roleId,
    firstName: user.firstName,
    lastName: user.lastName,
    roleName: role.roleName,
    assigned_at: new Date().toLocaleString(),
    id: uuidv4(),
  };

  readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data" });
      return;
    }

    const db: Database = JSON.parse(data.toString());
    db.assignUserRole.push(assignment);

    writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data" });
        return;
      }
      res.status(201).send("Assign Role To User Successfully!");
    });
  });
};

const getAllUserRoles = (req: Request, res: Response, next: NextFunction): void => {
  readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data" });
      return;
    }
    const assignmentsData: Database = JSON.parse(data.toString());
    res.status(200).json(assignmentsData);
  });
};

const deleteAssignUserRole = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data" });
      return;
    }

    const db: Database = JSON.parse(data.toString());
    const assignUserRoleIndex = db.assignUserRole.findIndex((u: Assignment) => u.id === id);

    if (assignUserRoleIndex === -1) {
      res.status(404).json({ error: "Role assignment not found" });
      return;
    }

    db.assignUserRole.splice(assignUserRoleIndex, 1);
    writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data" });
        return;
      }
      res.status(200).send("Assign Role to User Deleted Successfully!");
    });
  });
};

const editUserRole = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const { userId, roleId } = req.body;

  readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data" });
      return;
    }

    const db: Database = JSON.parse(data.toString());
    const assignmentIndex = db.assignUserRole.findIndex((assignment: Assignment) => assignment.id === id);

    if (assignmentIndex === -1) {
      res.status(404).json({ error: "Role assignment not found" });
      return;
    }

    const user = usersData.users.find((u: User) => u.id === userId);
    const role = rolesData.roles.find((r: Role) => r.id === roleId);

    if (!user || !role) {
      res.status(400).json({ message: "User or Role not found" });
      return;
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

    writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data" });
        return;
      }
      res.status(200).send("Assign Role To User Updated Successfully!");
    });
  });
};

export { assignUserRole, getAllUserRoles, deleteAssignUserRole, editUserRole };