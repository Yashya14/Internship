import { readFile, writeFile } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from 'express';

const dbPath = join(__dirname, "../database/roles.json");

interface Role {
    id: string;
    [key: string]: any;
}

interface Database {
    roles: Role[];
}

const getAllRoles = (req: Request, res: Response): void => {
    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }
        const roles: Role[] = JSON.parse(data.toString()).roles;
        res.json(roles);
    });
};

const getRoleById = (req: Request, res: Response): void => {
    readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }
        const roles: Role[] = JSON.parse(data).roles;
        const singleRole = roles.filter((role: Role) => role.id === req.params.id);

        if (singleRole.length === 0) {
            return res.status(404).json({ error: "Role not found" });
        }

        res.json(singleRole);
    });
};

const createRole = (req: Request, res: Response): void => {
    const newRole: Role = req.body;
    newRole.id = uuidv4();

    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }
        const db: Database = JSON.parse(data.toString());
        db.roles.push(newRole);
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to write data" });
            }
            res.status(201).send("Role Added Successfully!");
        });
    });
};

const updateRole = (req: Request, res: Response): void => {
    const updatedRole: Partial<Role> = req.body;

    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }
        const db: Database = JSON.parse(data.toString());

        const roleIndex = db.roles.findIndex((r: Role) => r.id === req.params.id);
        if (roleIndex === -1) {
            return res.status(404).json({ error: "Role not found" });
        }

        db.roles[roleIndex] = { ...db.roles[roleIndex], ...updatedRole };
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to write data" });
            }
            res.send("Role Updated Successfully!");
        });
    });
};

const deleteRole = (req: Request, res: Response): void => {
    const roleId = req.params.id;
    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db: Database = JSON.parse(data.toString());
        const roleIndex = db.roles.findIndex((r: Role) => r.id === roleId);
        if (roleIndex === -1) {
            return res.status(404).json({ error: 'Role not found' });
        }
        db.roles.splice(roleIndex, 1);
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.status(200).send("Role Deleted Successfully!");
        });
    });
};

export { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
