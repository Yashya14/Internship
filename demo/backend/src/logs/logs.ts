import mongoose, { Schema, Document } from 'mongoose';

interface IActivityLog extends Document {
    userId: string;
    action: string;
    timestamp: Date;
    details: string;
}

const ActivityLogSchema: Schema = new Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String, required: true }
});

const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

export default ActivityLog;