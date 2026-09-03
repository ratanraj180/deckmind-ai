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
 * Connect to MongoDB with connection pooling, caching, and resilient fallback.
 * 1. Attempts connection using process.env.MONGODB_URI.
 * 2. If the primary connection fails (e.g. bad credentials, network timeout),
 *    gracefully falls back to the local MongoDB instance (127.0.0.1:27017).
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If already connected and active, return immediately
  if (cached.conn && cached.conn.connection && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = process.env.MONGODB_LOCAL_URI || 'mongodb://127.0.0.1:27017/deckmind';

  const connectOptions: mongoose.ConnectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 3500,
    maxPoolSize: 10,
  };

  if (!cached.promise) {
    cached.promise = (async () => {
      // 1. Try primary URI if provided
      if (primaryUri) {
        try {
          console.log('[DeckMind DB] Connecting to primary MongoDB...');
          const conn = await mongoose.connect(primaryUri, connectOptions);
          console.log('[DeckMind DB] ✓ Connected to primary MongoDB successfully');
          return conn;
        } catch (primaryErr: any) {
          console.warn(
            `[DeckMind DB] ⚠ Primary MongoDB connection failed (${primaryErr?.message || 'Error'}). Checking fallback...`
          );
        }
      }

      // 2. Fallback to local MongoDB instance
      try {
        console.log(`[DeckMind DB] Connecting to fallback MongoDB (${fallbackUri})...`);
        const fallbackConn = await mongoose.connect(fallbackUri, connectOptions);
        console.log('[DeckMind DB] ✓ Connected to fallback local MongoDB successfully');
        return fallbackConn;
      } catch (fallbackErr: any) {
        console.error('[DeckMind DB] ✗ Both primary and fallback MongoDB connections failed:', fallbackErr?.message);
        throw new Error(
          `Database connection failed. Primary: ${primaryUri ? 'failed' : 'not configured'}; Fallback (${fallbackUri}): ${fallbackErr?.message}`
        );
      }
    })();
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
