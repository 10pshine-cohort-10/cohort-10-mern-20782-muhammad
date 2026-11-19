import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(
  pinoHttp({
    logger,
    redact: {
      paths: ['req.headers.authorization'],
      censor: '[REDACTED]',
    },
    autoLogging: { ignore: (req) => req.url.startsWith('/health') },
  })
);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
