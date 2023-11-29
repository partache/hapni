import * as api from '../services/posts';
import preload from '../middlewares/preload';

import {Router} from 'express';
import {isAuth, isOwner} from '../middlewares/guards';
import {mapErrors} from '../utils/mapper';
import {Types} from "mongoose";
import {PartialPost} from "../models/Post";

export const router = Router({mergeParams: true});
router.get('/all', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', isAuth(), async (req, res) => {
    const post: PartialPost = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        owner: req.user._id as Types.ObjectId
    };

    try {
        const result = await api.create(post);
        res.status(201).json(result);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            const error = mapErrors(err as Error);
            res.status(400).json({message: error});
        }
    }
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id',isAuth(), preload(), isOwner(), async (req, res) => {
    const postId = req.params.id;
    const post: PartialPost = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        owner: req.user._id as Types.ObjectId
    };

    try {
        const result = await api.update(postId, post);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            const error = mapErrors(err);
            res.status(400).json({message: error});
        }
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            const error = mapErrors(err);
            res.status(400).json({message: error});
        }
    }
});
