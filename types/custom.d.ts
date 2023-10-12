import { Request } from "express";
import { UserInterface } from "../models/user.model";

declare module 'express-serve-static-core' {
    namespace Express {
        interface Request {
            user?: UserInterface
        }
    }
}
