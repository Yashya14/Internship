// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const useUserContext = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUserContext must be used within a UserProvider');
//     }
//     return context;
// };

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [users, setUsers] = useState<IUser[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     const getAllUsers = async () => {
//         try {
//             const response = await axiosInstance.get('/users');
//             setUsers(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('There was an error fetching the users!', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getAllUsers();
//     }, []);

//     return (
//         <UserContext.Provider value={{ users, loading, getAllUsers }}>
//             {children}
//         </UserContext.Provider>
//     );
// };