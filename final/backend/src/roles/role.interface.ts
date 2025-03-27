interface IRole {
    roleName: string;
    roleDescription: string;
    roleType: string;
    status: string;
    _id: string;
    permissions: {
        user_permissions: string[];
        role_permissions: string[];
    };
}

export default IRole;