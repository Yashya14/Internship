const fs = require("fs");
const path = require("path");

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../database/users.json"), "utf8")
).users;

const roles = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../database/roles.json"), "utf8")
).roles;

const assignUserRole = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../database/assignUserRole.json"),
    "utf8"
  )
).assignUserRole;

// combined user data with roleName
const getUsersWithRoles = (req, res) => {
    try {
      const combinedData = users.map((user) => {
        const assignedRolesData = assignUserRole // get all roles assigned to a user
          .filter((assignment) => assignment.user_id === user.id) // user_id from assignUserRole is equal to user id from users 
          .map((assignment) => { 
            const role = roles.find((role) => role.id === assignment.role_id); // role id from assignUserRole is equal to role id from roles
            return role 
              ? { user_id: assignment.user_id, role_id: assignment.role_id, roleName: role.roleName,assign_id : assignment.id } // return user_id, role_id, and roleName if role is found
              : { user_id: assignment.user_id}; // return user_id if role is not found
          });

          // if no role is assigned ,always user_id is included
          if (assignedRolesData.length === 0) {
            assignedRolesData.push({ user_id: user.id });
            // console.log({ user_id: user.id }); 
          }
  
        return {
          ...user,
          roles: assignedRolesData,
        };
      });
  
      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
    }
  };
  

module.exports = {
    getUsersWithRoles,
};
