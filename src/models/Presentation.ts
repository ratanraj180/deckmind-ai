import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPresentation extends Document {
  id: string; // matches client proj-xxx id
  userId?: string;
  title: string;
  description?: string;
  document?: {
    id?: string;
    name: string;
    size?: number;
    type?: string;
    pages?: number;
    uploadedAt?: string;
  };
  config?: Record<string, any>;
  templateId?: string;
  template?: {
    id: string;
    name: string;
    family: string;
    layoutStyle: string;
    fontMood: string;
    palette: Record<string, any>;
  };
  slides: Array<Record<string, any>>;
  slideCount: number;
  status: 'DRAFT' | 'GENERATED' | 'PAID' | 'DOWNLOADED';
  downloadCount: number;
  lastDownloadedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PresentationSchema = new Schema<IPresentation>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      index: true,
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'DeckMind Presentation',
    },
    description: {
      type: String,
      default: '',
    },
    document: {
      type: Schema.Types.Mixed,
      default: {},
    },
    config: {
      type: Schema.Types.Mixed,
      default: {},
    },
    templateId: {
      type: String,
      default: 'swiss-red',
    },
    template: {
      type: Schema.Types.Mixed,
      default: {},
    },
    slides: {
      type: [Schema.Types.Mixed] as any,
      default: [],
    },
    slideCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'GENERATED', 'PAID', 'DOWNLOADED'],
      default: 'GENERATED',
      index: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    lastDownloadedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful compound index for listing user presentations ordered by creation
PresentationSchema.index({ userId: 1, createdAt: -1 });

export const Presentation: Model<IPresentation> =
  mongoose.models.Presentation ||
  mongoose.model<IPresentation>('Presentation', PresentationSchema);

export default Presentation;
