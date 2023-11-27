import {NextFunction, Request, Response} from "express";
import {getById} from '../services/posts';
import {Post} from "../models/Post";

export default () => async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const item = await getById(id).lean() as Post;
        res.locals.item = item;
        next();
    } catch (err) {
        console.error(err);
        res.status(404).json({message: 'Record not found'});
    }
};