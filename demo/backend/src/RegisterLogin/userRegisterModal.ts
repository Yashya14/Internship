import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });


const UserRegisterLogin = mongoose.model("UserRegisterLogin", userRegisterSchema);
export default UserRegisterLogin;