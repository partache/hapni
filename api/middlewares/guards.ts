import {NextFunction, Request, Response} from "express";

export function isAuth() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({message: 'Please log in'});
        }
    };
}

export function isGuest() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            next();
        } else {
            res.status(400).json({message: 'You are already signed in'});
        }
    };
}

export function isOwner() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user._id == res.locals.item.owner) {
            next();
        } else {
            res.status(403).json({message: 'You cannot modify this record'});
        }
    };
}
