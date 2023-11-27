import {Request, Response, NextFunction} from "express";
import { verifySession } from '../services/users';


export default ()  => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-authorization'] as string;

    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
        }
        next();

    } catch (err) {
        res.status(498).json({ message: 'Invalid access token. Please sign in' });
    }
};