import mongoose from 'mongoose';

/**
 * Global cache interface for Mongoose connection in Next.js.
 * In development, Next.js clears the Node.js module cache on every reload,
 * which can cause multiple open connections if not cached globally.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB Atlas with connection pooling and caching.
 * NEVER hardcodes credentials — reads process.env.MONGODB_URI at runtime.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      '[DeckMind DB] MONGODB_URI is not defined in environment variables. Please check .env.local'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    };

    console.log('[DeckMind DB] Initializing new MongoDB connection pool...');

    cached.promise = mongoose
      .connect(uri, opts)
      .then(m => {
        console.log('[DeckMind DB] ✓ Connected to MongoDB Atlas successfully');
        return m;
      })
      .catch(err => {
        cached.promise = null;
        console.error('[DeckMind DB] ✗ MongoDB connection error:', err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
