import {Request, Response, NextFunction} from "express";
import {User} from "../models/User";

export interface RequestWithUser extends Request {
    user: Partial<User>
}

export type Middleware = (req: RequestWithUser, res: Response, next: NextFunction) => void;

