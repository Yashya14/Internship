import { Request, Response } from "express";
import Role from "./RoleModal";

//! create new role 
const createRole = async (req: Request, res: Response) => {
    try {
        const roleData = new Role(req.body);
        if (!roleData) {
            res.status(400).send({ msg: "Role data not found" });
            return;
        }

        const savedData = await roleData.save();
        res.status(201).send({ savedData, msg: "Role added successfully" });
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to add role" });
    }
}

//! Get all roles 
const getAllRoles = async (_req: Request, res: Response) => {
    try {
        const roleData = await Role.find();
        if (!roleData) {
            res.status(404).send({ msg: "Roles not found" });
            return;
        }
        res.status(200).send(roleData);
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to get roles" });
    }
};

//! get role by id 
const getSingleRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const roleData = await Role.findById(id);
        if (!roleData) {
            res.status(404).send({ msg: "Role not found" });
            return;
        }
        res.status(200).send(roleData);
    } catch (error) {
        res.status(500).send({ error: error, msg: "Role not found" });
    }
};

//! update role 
const updateRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const roleExist = await Role.findById(id);
        if (!roleExist) {
            res.status(404).send({ msg: "Role not found" });
            return;
        }
        const updatedData = await Role.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send({ updatedData, msg: "Role updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error, msg: "Role not found" });
    }
};

//! delete role 
const deleteRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const roleExist = await Role.findById(id);
        if (!roleExist) {
            res.status(404).send({ msg: "Role not found" });
            return;
        }
        const deletedData = await Role.findByIdAndDelete(id);
        res.status(200).send({ deletedData, msg: "Role deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error, msg: "Role not found" });
    }
};

export { createRole, getSingleRole, getAllRoles, updateRole, deleteRole };