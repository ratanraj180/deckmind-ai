import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  userId: string;
  presentationId: string;
  amount: number; // in paise (1000 = ₹10)
  currency: string;
  provider: string; // 'razorpay'
  providerOrderId: string;
  providerPaymentId?: string;
  providerSignature?: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    presentationId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    provider: {
      type: String,
      default: 'razorpay',
    },
    providerOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    providerPaymentId: {
      type: String,
      default: null,
      index: true,
    },
    providerSignature: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESSFUL', 'FAILED'],
      default: 'PENDING',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
