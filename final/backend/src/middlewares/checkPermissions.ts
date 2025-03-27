
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import AssignUserRole from '../assignUserRole/assignUserRole.model';
import User from '../user/user.model';

const checkPermissions = (requiredPermissions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?._id;
            // console.log("User id", userId);

            // const user = await User.findById(userId);
            // const userPermissions = user?.permissions || [];

            const userRoles = await AssignUserRole.find({ user: userId }).populate('role');
            const rolePermissions = userRoles.flatMap(userRole => [
                ...userRole.role.map((role: any) => role.permissions.user_permissions).flat(),
                ...userRole.role.map((role: any) => role.permissions.role_permissions).flat(),
                ...userRole.role.map((role: any) => role.permissions.assign_permissions).flat()
            ]);

            const allPermissions = [...rolePermissions];

            const hasPermission = requiredPermissions.every(permission =>
                allPermissions.includes(permission)
            );

            if (!hasPermission) {
                return next(createHttpError(403, "You do not have permission to perform this action"));
            }

            next();
        } catch (error) {
            next(createHttpError(500, "Internal Server Error"));
        }
    };
};

export default checkPermissions;

