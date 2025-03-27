import { Request, Response } from "express";
import createHttpError from "http-errors";
import Role from "./role.model";

//! create new role 
const createRole = async (req: Request, res: Response, next: Function) => {
    try {
        const roleData = new Role(req.body);
        if (!roleData) {
            return next(createHttpError(400, "Role data not found"));
        }

        const savedData = await roleData.save();
        res.status(201).send({ savedData, msg: "Role added successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to add role"));
    }
}

//! Get all roles 
const getAllRoles = async (_req: Request, res: Response, next: Function) => {
    try {
        const roleData = await Role.find({ _id: { $ne: "67c7e159adf0a7b1f2bd6015" } });
        if (!roleData) {
            next(createHttpError(404, "Roles not found"));
            return;
        }
        res.status(200).send(roleData);
    } catch (error) {
        next(createHttpError(500, "Failed to get roles"));
        return;
    }
};

//! get role by id 
const getSingleRole = async (req: Request, res: Response, next: Function) => {
    try {
        const id = req.params.id;
        const roleData = await Role.findById(id);
        if (!roleData) {
            return next(createHttpError(404, "Role not found"));
        }
        res.status(200).send(roleData);
    } catch (error) {
        return next(createHttpError(500, "Role not found"));
    }
};

//! update role 
const updateRole = async (req: Request, res: Response, next: Function) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const roleExist = await Role.findById(id);
        if (!roleExist) {
            return next(createHttpError(404, "Role not found"));
        }
        const updatedData = await Role.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send({ updatedData, msg: "Role updated successfully" });
    } catch (error) {
        return next(createHttpError(500, "Role not found"));
    }
};

//! delete role 
const deleteRole = async (req: Request, res: Response, next: Function) => {
    try {
        const id = req.params.id;
        const roleExist = await Role.findById(id);
        if (!roleExist) {
            return next(createHttpError(404, "Role not found"));
        }
        const deletedData = await Role.findByIdAndDelete(id);
        res.status(200).send({ deletedData, msg: "Role deleted successfully" });
    } catch (error) {
        return next(createHttpError(500, "Role not found"));
    }
};

export { createRole, getSingleRole, getAllRoles, updateRole, deleteRole };