import express, {Request, Response} from 'express';
import cors from './middlewares/cors';

start();

async function start() {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req: Request, res: Response) => res.json({message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
}