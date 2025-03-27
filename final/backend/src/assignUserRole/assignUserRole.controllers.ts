import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import User from '../user/user.model';
import Role from '../roles/role.model';
import AssignUserRole from './assignUserRole.model';

//! assign role to user 
const assignUserRole = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, roleIds } = req.body;

  try {
    if (!Array.isArray(roleIds) || roleIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      throw createError(400, "Invalid role IDs");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, "User not found");
    }

    const roles = await Role.find({ '_id': { $in: roleIds } });
    if (roles.length !== roleIds.length) {
      throw createError(404, "One or more roles not found");
    }

    // to checck if the user already has the roles assigned
    const existingAssignments = await AssignUserRole.findOne({
      user: userId,
      role: { $all: roleIds }
    });

    if (existingAssignments) {
      throw createError(400, "The user already has these roles assigned");
    } else {
      const updatedAssignment = await AssignUserRole.findOneAndUpdate(
        { user: userId },
        // { $set: { role: roleIds } }, // set the new roles
        { $addToSet: { role: { $each: roleIds } } }, // add the new roles without duplication
        { new: true, upsert: true } // return the updated document, and create if it doesn't exist
      );

      // ? add roles to user modal
      const roleNames = roles.map(role => role.roleName);
      await User.findByIdAndUpdate(userId, { $addToSet: { roles: { $each: roleNames } } });

      res.status(201).send({ result: updatedAssignment, msg: "Roles assigned to user successfully" });
    }

  } catch (error: any) {
    if (error.status && error.message) {
      res.status(error.status).send({ msg: error.message });
    } else {
      next(createError(500, "Error assigning roles to user"));
    }
  }
};

//! get all AssignRoleToUser 
const getAllAssignUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignUserRoles = await AssignUserRole.find({ _id: { $ne: "67caa195850cd4e6cf3332c9" } });

    if (!assignUserRoles || assignUserRoles.length === 0) {
      throw createError(404, "No role assignments found");
    }

    // ? get fistname, lastname and roleNames
    const detailedAssignments = await Promise.all(assignUserRoles.map(async (assignment) => {
      const user = await User.findById(assignment.user);
      const roles = await Role.find({ '_id': { $in: assignment.role } });

      return {
        ...assignment.toObject(),
        firstName: user?.firstName,
        lastName: user?.lastName,
        roleNames: roles.map(role => role.roleName)
      };
    }));

    // console.log("AssignRoleToUser : ", detailedAssignments);

    res.status(200).send(detailedAssignments);
  } catch (error: any) {
    if (error.status && error.message) {
      res.status(error.status).send({ msg: error.message });
    } else {
      next(createError(500, "Failed to read data"));
    }
  }
};

//! delete AssignRoleToUser 
const deleteAssignUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const userExist = await AssignUserRole.findById(id);
    if (!userExist) {
      throw createError(404, "AssignRoleToUser not found");
    }

    const deletedData = await AssignUserRole.findByIdAndDelete(id);
    res.status(200).send({ deletedData, msg: "AssignRoleToUser deleted successfully" });
  } catch (error: any) {
    if (error.status && error.message) {
      res.status(error.status).send({ msg: error.message });
    } else {
      next(createError(500, "Failed to delete AssignRoleToUser"));
    }
  }
};

//! edit assign role to user 
const editAssignUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { roleIds } = req.body;

    // Validate the roleIds
    if (!Array.isArray(roleIds) || roleIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      throw createError(400, "Invalid role IDs");
    }

    // Validate if the roles exist
    const roles = await Role.find({ '_id': { $in: roleIds } });
    if (roles.length !== roleIds.length) {
      throw createError(404, "One or more roles not found");
    }

    // Update only role field
    const updatedAssignUserRole = await AssignUserRole.findByIdAndUpdate(
      id,
      { $set: { role: roleIds } },
      { new: true }
    );

    if (!updatedAssignUserRole) {
      throw createError(404, "AssignRoleToUser not found");
    }

    res.status(200).send({ updatedAssignUserRole, msg: "Assigned roles to user updated successfully" });
  } catch (error: any) {
    if (error.status && error.message) {
      res.status(error.status).send({ msg: error.message });
    } else {
      next(createError(500, "Failed to edit assign role to user"));
    }
  }
};

export { assignUserRole, getAllAssignUserRoles, deleteAssignUserRole, editAssignUserRole };

