import { getSingleUser } from './../user/users.controllers';
import User from '../user/user.model';
import { Request, Response, NextFunction } from 'express';
import AssignUserRole from '../assignUserRole/assignUserRole.model';
import createError from 'http-errors';

const getUsersWithRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ _id: { $ne: "67c84fa95ba86461cc60953d" } }).select('-password');
    if (!users || users.length === 0) {
      return next(createError(404, "Users not found"));
    }

    const usersWithRoles = await Promise.all(users.map(async (user) => {
      const userRoles = await AssignUserRole.find({ user: user._id })
        .populate({
          path: 'role', // Populate the role field in AssignUserRole 
          select: 'roleName roleType'
        });


      // Check if any roles exist, otherwise set roles to an empty array
      const roles = userRoles.length > 0 ? userRoles.flatMap(userRole => userRole.role ? userRole.role.map((r: any) => r.roleName) : []) : [];
      const roleTypes = userRoles.length > 0 ? userRoles.flatMap(userRole => userRole.role ? userRole.role.map((r: any) => r.roleType) : []) : [];

      return {
        ...user.toObject(),  // Return user fields
        roles: roles.filter(role => role !== null), // add roles (filter out null values)
        roleType: roleTypes.filter(roleType => roleType !== null)

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

export const getSingleUserWithRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const userRoles = await AssignUserRole.find({ user: user._id })
      .populate({
        path: 'role',
        select: 'roleName roleType'
      });

    const roles = userRoles.length > 0 ? userRoles.flatMap(userRole => userRole.role ? userRole.role.map((r: any) => r.roleName) : []) : [];
    const roleTypes = userRoles.length > 0 ? userRoles.flatMap(userRole => userRole.role ? userRole.role.map((r: any) => r.roleType) : []) : [];

    const userWithRoles = {
      ...user.toObject(),
      roles: roles.filter(role => role !== null),
      roleType: roleTypes.filter(roleType => roleType !== null)

    };

    res.status(200).send(userWithRoles);
  } catch (error) {
    if (error instanceof Error) {
      return next(createError(500, "Internal Server Error"));
    }
    return next(error);
  }
}
export default getUsersWithRoles;