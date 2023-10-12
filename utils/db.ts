import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const dbUrl: string = process.env.MONGO_DB_URL || ''

const connectToDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data: any) => {
            console.log(`database connected with ${data.connection.host}`)
        })
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectToDB, 5000)
    }
}
export default connectToDB