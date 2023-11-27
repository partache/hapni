import express, {Request, Response} from 'express';
import cors from './middlewares/cors';
import * as mongoose from "mongoose";

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

    app.get('/', (req: Request, res: Response) => res.json({message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
}