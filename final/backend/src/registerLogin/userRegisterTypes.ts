import { ObjectId } from "mongodb";

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    _id: ObjectId;

}