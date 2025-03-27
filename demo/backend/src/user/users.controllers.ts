import { NextFunction, Request, Response } from 'express';
import User from '../user/UserModal';
import AssignUserRole from '../assignUserRole/AssignUserRoleModal';
import createHttpError from 'http-errors';

//! create new user 
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = new User(req.body);
        if (!userData) {
            return next(createHttpError(400, "User data not found"));
        }

        const savedData = await userData.save();
        // console.log(savedData);
        res.status(201).send("User added successfully");
    } catch (error) {
        return next(createHttpError(500, "Failed to add user"));
    }
};

//! Get all users 
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return next(createHttpError(404, "Users not found"));
        }
        res.status(200).send(userData);
        // console.log(userData);
    } catch (error) {
        return next(createHttpError(500, "Failed to get users"));
    }
};

//!get user by id
export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return next(createHttpError(404, "User not found"));
        }
        res.status(200).send(userData);
    } catch (error) {
        return next(createHttpError(500, "User not found"));
    }
}

//!delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return next(createHttpError(404, "User not found"));

        }

        const deletedData = await User.findByIdAndDelete(id);
        if (deletedData) {
            await AssignUserRole.deleteMany({ user: id }); // delete assinged roles
        }
        res.status(200).send({ deletedData, msg: "User and assigned roles deleted successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to delete user"));

    }
};

//! update user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return next(createHttpError(404, "User not found"));

        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ updatedData, msg: "User updated successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to update user"));
    }
}
