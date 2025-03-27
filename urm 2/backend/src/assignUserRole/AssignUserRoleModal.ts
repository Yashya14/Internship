import mongoose, { Schema } from 'mongoose';

const AssignUserRoleSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }],
    assignedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const AssignUserRole = mongoose.model('AssignUserRole', AssignUserRoleSchema);

export default AssignUserRole;