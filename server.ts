import { app } from './app'
import dotenv from 'dotenv';
import connectToDB from './utils/db';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {
    connectToDB()
    console.log(`server running on port : ${process.env.PORT}`)
})