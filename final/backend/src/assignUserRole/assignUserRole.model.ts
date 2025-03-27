import mongoose, { Schema } from 'mongoose';
import IAssignUserRole from './asssignUserRole.interface';

const AssignUserRoleSchema: Schema = new Schema<IAssignUserRole>({
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

const AssignUserRole = mongoose.model<IAssignUserRole>('AssignUserRole', AssignUserRoleSchema);

export default AssignUserRole;