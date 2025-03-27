// import { useContext, useEffect, useState } from "react";

// const RoleContext = createContext<RoleContextProps | undefined>(undefined);

// export const useRoleContext = () => {
//     const context = useContext(RoleContext);
//     if (!context) {
//         throw new Error('useRoleContext must be used within a RoleProvider');
//     }
//     return context;
// };

// export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [roles, setRoles] = useState<IRole[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     const getAllRoles = async () => {
//         try {
//             const response = await axiosInstance.get('/roles');
//             setRoles(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('There was an error fetching the roles!', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getAllRoles();
//     }, []);

//     return (
//         <RoleContext.Provider value={{ roles, loading, getAllRoles }}>
//             {children}
//         </RoleContext.Provider>
//     );
// };

// function createContext<T>(undefined: undefined) {
//     throw new Error("Function not implemented.");
// }
