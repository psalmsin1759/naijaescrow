import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  business: mongoose.Types.ObjectId;
  role: 'owner' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin'],
      default: 'admin',
    },
    isActive: {
       type: Boolean,
       default: true,
    },
  },
  { timestamps: true }
);

AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
