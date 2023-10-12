import { Redis } from 'ioredis'
import dotenv from 'dotenv';

dotenv.config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log(`redis is connected`)
        return process.env.REDIS_URL
    }
    throw new Error('Redis failed to connect')
}

export const redis = new Redis(redisClient())