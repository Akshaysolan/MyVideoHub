import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db';
import routes from './route/index';
import passportJwtStrategy from './config/passportJwtStrategy';

dotenv.config();

const app = express();

app.use(express.json()); 

connectDb();

const corsOptions = {
    origin:["http://localhost:5173"],
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use(passportJwtStrategy.initialize());

const port = process.env.PORT || 8080;

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`listening on the port ${port}`);
});
