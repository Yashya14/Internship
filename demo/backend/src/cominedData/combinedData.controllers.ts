import User from '../user/UserModal';
import { Request, Response, NextFunction } from 'express';
import AssignUserRole from '../assignUserRole/AssignUserRoleModal';
import createError from 'http-errors';

const getUsersWithRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return next(createError(404, "Users not found"));
    }

    const usersWithRoles = await Promise.all(users.map(async (user) => {
      // find the roles for each user in the AssignUserRole collection
      const userRoles = await AssignUserRole.find({ user: user._id })
        .populate({
          path: 'role', // Populate the role field in AssignUserRole 
          select: 'roleName' // Only include roleName field from Role model
        });

      // Log the userRoles to debug
      // console.log(`UserRoles for user ${user._id}:`, userRoles);

      // Check if any roles exist, otherwise set roles to an empty array
      const roles = userRoles.length > 0 ? userRoles.flatMap(userRole => userRole.role ? userRole.role.map((r: any) => r.roleName) : []) : [];

      // Log the roles to debug
      // console.log(`Roles for user ${user._id}:`, roles);

      return {
        ...user.toObject(),  // Return user fields
        roles: roles.filter(role => role !== null) // add roles (filter out null values)
      };
    }));

    res.status(200).send(usersWithRoles);
  } catch (error) {
    if (error instanceof Error) {
      return next(createError(500, "Internal Server Error"));
    }
    return next(error);
  }
}

export default getUsersWithRoles;