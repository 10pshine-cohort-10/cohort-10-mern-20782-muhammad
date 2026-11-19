import mongoose from 'mongoose';
import config from './index.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (err) {
    const hint =
      err.name === 'MongooseServerSelectionError'
        ? 'Could not reach MongoDB. Check MONGODB_URI in backend/.env and your Atlas network access (IP whitelist).'
        : 'Check MONGODB_URI in backend/.env.';
    throw new Error(`MongoDB connection failed (${err.message}) — ${hint}`);
  }
}

export async function closeDB() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    throw new Error(`Failed to close MongoDB connection: ${err.message}`);
  }
}
