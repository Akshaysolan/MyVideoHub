import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db';
import routes from './route/index';

dotenv.config();

const app = express();

app.use(express.json()); 

connectDb();

const port = process.env.PORT || 8080;

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`listening on the port ${port}`);
});
