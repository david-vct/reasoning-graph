import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  graphQuota: number;
  preferences: {
    theme: 'light' | 'dark';
    connectionMode: 'drag-drop' | 'click-click';
  };
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false, // Exclude from queries by default for security
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  graphQuota: {
    type: Number,
    default: 50,
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    connectionMode: {
      type: String,
      enum: ['drag-drop', 'click-click'],
      default: 'drag-drop',
    },
  },
});

// Export Mongoose model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
