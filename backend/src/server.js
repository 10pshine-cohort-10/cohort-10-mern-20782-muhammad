import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';
import { connectDB } from './config/db.js';

async function start() {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`API listening on http://localhost:${config.port} (${config.env})`);
  });
}

start().catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
