import * as api from '../services/posts';
import preload from '../middlewares/preload';
import {ObjectId} from 'mongodb';

import {Router} from 'express';
import {isAuth, isOwner} from '../middlewares/guards';
import {mapErrors} from '../utils/mapper';
import {PartialPost, Post} from "../models/Post";
import {Types} from "mongoose";

export const router = Router({mergeParams: true});
router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    const post: PartialPost = {
        title: req.body.title,
        description: req.body.description,
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

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const postId = req.params.id;
    const post: PartialPost = {
        title: req.body.title,
        description: req.body.description,
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
