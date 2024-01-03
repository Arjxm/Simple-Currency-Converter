import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import cryptoRouter from './routes/cryptoApiRoutes'



export const app = express();

app.use(cors()); 

const PORT = 3001 || process.env.PORT;

app.use(bodyParser.json());

app.use('/api', cryptoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });