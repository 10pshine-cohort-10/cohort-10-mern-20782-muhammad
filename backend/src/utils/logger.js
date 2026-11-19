import pino from 'pino';
import config from '../config/index.js';

const logger = pino({
  level: config.logLevel,
  ...(config.env !== 'production' && {
    transport: { target: 'pino-pretty', options: { colorize: true } },
  }),
});

export default logger;
