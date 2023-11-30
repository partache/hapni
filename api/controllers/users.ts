import {Router} from 'express';
import {isGuest} from '../middlewares/guards';
import {login, logout, register} from '../services/users';
import {mapErrors} from '../utils/mapper';

export const router = Router();
router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and password are required');
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim(), req.body.name.trim());
        res.status(201).json(result);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            const error = mapErrors(err as Error);
            res.status(400).json({message: error});
        }
    }
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            const error = mapErrors(err as Error);
            res.status(400).json({message: error});
        }
    }
})

router.get('/logout', (req, res) => {
    if(!req.user.accessToken){
        res.status(500);
    } else {
    logout(req.user.accessToken);
    res.status(204).end();
    }
})
