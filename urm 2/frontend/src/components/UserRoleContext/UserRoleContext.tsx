import { useState, useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";
import { IUser } from "../UserManagement/User.interface";
import { IRole } from "../RoleManagement/Role.interface";
import { IAssignUserRole } from "../AssignUserRole/AssignUserRole.interface";
import axiosInstance from "../Axios/axiosInstance";

export interface Log {
    date: string;
    user: string;
    action: string;
    status: string;
    details: string;
}

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
    activeRoleCount: number;
    inactiveRoleCount: number;
    logsData: Log[]; // activity logs

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
    $grow?: number;
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

    const [activeRoleCount, setActiveRoleCount] = useState<number>(0);
    const [inactiveRoleCount, setInactiveRoleCount] = useState<number>(0);

    const [logsData,setLogsData] = useState<Log[]>([]); // activity logs

    // console.log("activeRoleCount UserRoleContext File: ", activeRoleCount);
    // console.log("inactiveRoleCount : ", inactiveRoleCount);

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

            const activeRoles = response.data.filter((role: IRole) => role.status.toLowerCase() === 'Active'.toLowerCase()).length;
            const inactiveRoles = response.data.filter((role: IRole) => role.status.toLowerCase() === 'InActive'.toLowerCase()).length;
           console.log("activeRoles running: ");
            setActiveRoleCount(activeRoles);
            setInactiveRoleCount(inactiveRoles);
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
            console.log(response)
            console.log("assignUserRole : ", response.data);
            setUserRole(response.data);
            // console.log(response.data);

            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the assign user role!', error);
            setLoading(false);
        }
    };

    // get activity logs of admin
    const getAllLogs = async () => {
        try {
            const response = await axiosInstance.get('/logs');
            const reversedData = response.data.reverse();
            setLogsData(reversedData);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllRoles();
        getAllAssignUserRole();
        getCombinedData();
        getAllLogs();
    }, []);


    return (
        <UserRoleContext.Provider value={{ users, roles, userRole, loading, getAllUsers, getAllRoles, getAllAssignUserRole, combinedData, getCombinedData, activeRoleCount, inactiveRoleCount,logsData }}>
            {children}
        </UserRoleContext.Provider>
    );
};
