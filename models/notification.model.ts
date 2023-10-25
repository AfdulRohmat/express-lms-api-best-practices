import mongoose, { Document, Model, Schema } from "mongoose";

export interface NotificationInterface extends Document {
    title: string,
    message: string,
    status: string,
    userId: string
}

const notificationSchema: Schema<NotificationInterface> = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "unread"
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const NotificationModel: Model<NotificationInterface> = mongoose.model("Notification", notificationSchema)
export default NotificationModel