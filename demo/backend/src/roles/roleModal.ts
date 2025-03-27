import mongoose from "mongoose";
import IRole from "./roleTypes";

const roleSchema = new mongoose.Schema<IRole>({
    roleName: {
        type: String,
        required: [true, 'Role Name is required'],
        trim: true,
        minLength: [5, 'Role Name must be at least 5 characters long']
    },
    roleDescription: {
        type: String,
        trim: true,
    },
    roleType: {
        type: String,
        required: [true, 'Role Type is required']

    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required']
    },
    permissions: {
        user_permissions: {
            type: [String],
        },
        role_permissions: {
            type: [String],
        }
    }
}, { timestamps: true });

const Role = mongoose.model<IRole>('Role', roleSchema);
export default Role;

