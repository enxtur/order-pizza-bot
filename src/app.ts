import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes';
import { webhooks } from './webhooks';
import { verifyRequestSignature } from './middlewares/verify-request-signature';


export const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/webhook', webhooks);