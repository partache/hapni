import express, {Request, Response} from 'express';
import * as mongoose from "mongoose";
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import {router as postController} from './controllers/posts'
import {router as userController} from './controllers/users'

start();

async function start() {

    try {
        await mongoose.connect('mongodb://localhost:27017/hapni');
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(auth());
    app.use('/posts', postController);
    app.use('/users', userController);

    app.get('/', (req: Request, res: Response) => res.json({message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
}