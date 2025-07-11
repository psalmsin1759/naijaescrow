import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  description?: string;
  address?: string;
  //admins?: mongoose.Types.ObjectId[]; 
  isActive: boolean;
  isVerified: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema: Schema<IBusiness> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    isActive: {
       type: Boolean,
       default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String
    },
    verificationCodeExpires: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

export const Business = mongoose.model<IBusiness>('Business', BusinessSchema);
