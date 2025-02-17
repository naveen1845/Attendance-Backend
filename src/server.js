import cors from 'cors';
import express from 'express';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRouter.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log('App started on port ', PORT);
    connectDB();
})


app.get('/ping', (req, res) => {
    res.send({message: 'Pong from attendance App'});
})



