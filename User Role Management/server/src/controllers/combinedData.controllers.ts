import { readFileSync } from "fs";
import { join } from "path";
import { Request, Response } from 'express';

interface User {
    id: string;
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
    id: string;
    [key: string]: any;
}

const users: User[] = JSON.parse(
  readFileSync(join(__dirname, "../database/users.json"), "utf8")
).users;

const roles: Role[] = JSON.parse(
  readFileSync(join(__dirname, "../database/roles.json"), "utf8")
).roles;

const assignUserRole: Assignment[] = JSON.parse(
  readFileSync(
    join(__dirname, "../database/assignUserRole.json"),
    "utf8"
  )
).assignUserRole;

const getUsersWithRoles = (req: Request, res: Response): void => {
    try {
      const combinedData = users.map((user: User) => {
        const assignedRolesData = assignUserRole
          .filter((assignment: Assignment) => assignment.user_id === user.id)
          .map((assignment: Assignment) => { 
            const role = roles.find((role: Role) => role.id === assignment.role_id);
            return role 
              ? { user_id: assignment.user_id, role_id: assignment.role_id, roleName: role.roleName, assign_id: assignment.id }
              : { user_id: assignment.user_id };
          });

          if (assignedRolesData.length === 0) {
            assignedRolesData.push({ user_id: user.id });
          }
  
        return {
          ...user,
          roles: assignedRolesData,
        };
      });
  
      res.json(combinedData);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "An error occurred while fetching data", error: errorMessage });
    }
  };

export { getUsersWithRoles };
