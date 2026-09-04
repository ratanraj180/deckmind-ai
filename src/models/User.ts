import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  presentationsCreated: number;
  presentationsDownloaded: number;
  totalDownloads: number;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SCHEMA_VERSION = 'v2_lowercase_roles';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      set: (v: string) => {
        if (!v) return 'user';
        const lower = v.toLowerCase();
        return lower === 'admin' ? 'admin' : 'user';
      },
    },
    presentationsCreated: {
      type: Number,
      default: 0,
    },
    presentationsDownloaded: {
      type: Number,
      default: 0,
    },
    totalDownloads: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Force schema refresh when schema version changes (handles Next.js hot reload stale cache)
function getOrCreateUserModel(): Model<IUser> {
  if (mongoose.models.User) {
    const cached = mongoose.models.User as Model<IUser>;
    // Check if the cached model has the current schema version
    if ((cached.schema as any).__schemaVersion === SCHEMA_VERSION) {
      return cached;
    }
    // Stale schema — delete and recreate
    delete mongoose.models.User;
    delete (mongoose as any).modelSchemas?.User;
  }
  (UserSchema as any).__schemaVersion = SCHEMA_VERSION;
  return mongoose.model<IUser>('User', UserSchema);
}

export const User: Model<IUser> = getOrCreateUserModel();

export default User;
