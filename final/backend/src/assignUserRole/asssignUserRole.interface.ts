import mongoose from 'mongoose';

interface IAssignUserRole {
    user: mongoose.Types.ObjectId;
    role: mongoose.Types.ObjectId[];
    assignedAt: Date;
}

export default IAssignUserRole;