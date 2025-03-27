export interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
}

// props for AddEditUserModal component
export interface AddEditUserModalProps {
  onAdd: (newUser: IEmployee) => void;
  onClose: () => void;
  user: IEmployee | null;
}

// Define an interface for user data
export interface IUserData {
  firstName: string;
  lastName: string;
  dateOfBirth : string;
  address: string;

}

//  to show user information
export interface ShowUserDetailsProps {
    user : IEmployee;
    onClose: () => void;
}

// export const dummyData: IEmployee[] = [{
//     id: "1",
//     firstName: "John",
//     lastName: "Doe"
// }, {
//     id: "2",
//     firstName: "Sanket",
//     lastName: "Doe"
// }, {
//     id: "3",
//     firstName: "Harry",
//     lastName: "Potter"
// }, {
//     id: "4",
//     firstName: "Rajat",
//     lastName: "Sharma"
// }];