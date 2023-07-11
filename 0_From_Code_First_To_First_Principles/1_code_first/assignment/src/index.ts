import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import compression from 'compression'; 
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());


app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});