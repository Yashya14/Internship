export interface IUser {
    _id: string;
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
}







