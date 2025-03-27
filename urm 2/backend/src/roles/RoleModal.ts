import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: [true, 'Role Name is required'],
        trim: true,
        minLength: [5, 'Role Name must be at least 5 characters long']
    },
    roleDescription: {
        type: String,
        required: [true, 'Role Description is required'],
        trim: true,
        minLength: [20, 'Role Description must be at least 20 characters long']
    },
    roleType: {
        type: String,
        required: [true, 'Role Type is required']

    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required']
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;

