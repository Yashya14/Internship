interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    username: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: {
        street: string;
        city: string;
        zipcode: string;
        state: string;
        country: string;
    },
    password: string;
    role: string[];
    permissions: string[];
}

export default IUser;