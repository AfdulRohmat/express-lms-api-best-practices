import mongoose, { Document, Model, Schema } from "mongoose";

export interface OrderInterface extends Document {
    courseId: string,
    userId: string,
    paymentInfo: Object
}

const orderSchema: Schema<OrderInterface> = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: Object
        // required: true
    }
}, { timestamps: true })

const OrderModel: Model<OrderInterface> = mongoose.model("Order", orderSchema)
export default OrderModel