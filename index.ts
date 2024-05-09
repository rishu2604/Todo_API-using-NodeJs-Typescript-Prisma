import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

import express from 'express';
import router from './routes/todoRoutes';

const app = express();
app.use(express.json());

app.use('/api/todo', router);

app.listen(3000, () => {
    console.log('Server started');
});
