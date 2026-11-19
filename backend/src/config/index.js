import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  logLevel: process.env.LOG_LEVEL || 'info',
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};

if (!config.jwt.secret) {
  throw new Error('JWT_SECRET is not set. Copy backend/.env.example to backend/.env and provide a secret.');
}

if (!config.mongoUri) {
  throw new Error('MONGODB_URI is not set. Copy backend/.env.example to backend/.env and add your Atlas connection string.');
}

export default config;
