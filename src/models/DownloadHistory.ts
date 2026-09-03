import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDownloadHistory extends Document {
  presentationId: string;
  userId?: string;
  fileName: string;
  fileSize: number;
  templateId?: string;
  templateFamily?: string;
  downloadedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const DownloadHistorySchema = new Schema<IDownloadHistory>(
  {
    presentationId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      index: true,
      default: null,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    templateId: {
      type: String,
      default: null,
    },
    templateFamily: {
      type: String,
      default: null,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

export const DownloadHistory: Model<IDownloadHistory> =
  mongoose.models.DownloadHistory ||
  mongoose.model<IDownloadHistory>('DownloadHistory', DownloadHistorySchema);

export default DownloadHistory;
