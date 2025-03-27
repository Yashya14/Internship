import { useState, useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";
import { IUser } from "../UserManagement/User.interface";
import { IRole } from "../RoleManagement/Role.interface";
import { IAssignUserRole } from "../AssignUserRole/AssignUserRole.interface";
import axiosInstance from "../axios/axiosInstance";

// Combined context props
interface UserRoleContextProps {
    users: IUser[];
    roles: IRole[];
    userRole: IAssignUserRole[];
    loading: boolean;
    getAllUsers: () => void;
    getAllRoles: () => void;
    getAllAssignUserRole: () => void;
    combinedData: ICombine[]; //! combined data
    getCombinedData: () => void; //! combined data
   
}
//! Combined data interface 
export interface ICombine {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
        state: string;
        country: string;
    };
    id: string;
    roles: {
        user_id: string;
        role_id: string;
        roleName: string;
        assign_id: string;
    }[];
}


const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const useUserRoleContext = () => {
    const context = useContext(UserRoleContext);
    if (!context) {
        throw new Error('useUserRoleContext must be used within a UserRoleProvider');
    }
    return context;
};

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([]); // to store the users data
    const [roles, setRoles] = useState<IRole[]>([]); // to store the roles data
    const [userRole, setUserRole] = useState<IAssignUserRole[]>([]); // to store the assign user role data
    const [loading, setLoading] = useState<boolean>(true);
    const [combinedData, setCombinedData] = useState<ICombine[]>([]); //! combined data
  

    const getCombinedData = async () => {
        console.log('fetching combined data');
        try {
            const response = await axiosInstance.get('/users-with-roles');
            setCombinedData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the combined data!', error);
            setLoading(false);
        }
    }

    // fetch all users data
    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
            setLoading(false);
        }
    };

    // fetch all roles data
    const getAllRoles = async () => {
        try {
            const response = await axiosInstance.get('/roles');
            setRoles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching assign user role!', error);
            setLoading(false);
        }
    };

    // fetch all assign user role data
    const getAllAssignUserRole = async () => {
        try {
            setLoading(true); //!
            const response = await axiosInstance.get('/user-role');
            console.log("assignUserRole : ",response.data.assignUserRole);
            setUserRole(response.data.assignUserRole);
            // console.log(userRole);
            
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the assign user role!', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllRoles();
        getAllAssignUserRole();
        getCombinedData();
    }, []);
    

    return (
        <UserRoleContext.Provider value={{ users, roles, userRole, loading, getAllUsers, getAllRoles, getAllAssignUserRole, combinedData, getCombinedData}}>
            {children}
        </UserRoleContext.Provider>
    );
};
