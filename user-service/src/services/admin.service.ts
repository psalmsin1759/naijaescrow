import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  { IAdmin } from "../models/admin.model";
import {  UpdateQuery } from 'mongoose';
import { AdminRepository } from "../repositories/AdminRepository";
import {forgotPasswordText} from "../utils/emailBody";
import {sendEmail} from "../events/sendEmail";

const adminRepo = new AdminRepository();

interface Result {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

export const createAdmin = async (data: Partial<IAdmin>)  => {
   
    const AdminEmail = await adminRepo.findByEmail(data.email!);
    if (AdminEmail){
        const error = new Error('Admin with this email found');
        (error as any).status = 404;
        throw error;
    }

    return adminRepo.create(data);
    
}

export const login = async (email: string, password: string): Promise<Result> => {
  const user = await adminRepo.findByEmail(email);
  if (!user) {
    const error = new Error('No account found with this email');
    (error as any).status = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Incorrect password');
    (error as any).status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  return {
    success: true,
    message: 'Login successful',
    data: user,
    token,
  };
};


export const forgotPassword = async (email: string): Promise<Result> => {
  const admin = await adminRepo.findByEmail(email);
  if (!admin) {
    const error = new Error('User not found');
    (error as any).status = 404;
    throw error;
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const subject = 'Password Reset Request';
  const htmlContent = forgotPasswordText(admin.firstName, resetLink);

  await sendEmail(admin.email, subject, htmlContent);

  return {
    success: true,
    message: 'Password reset link sent to your email',
  };
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<Result> => {
  let userId: string;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    userId = decoded.id;
  } catch (error) {
    const err = new Error('Invalid or expired token');
    (err as any).status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await adminRepo.update(userId, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    const error = new Error('Admin not found');
    (error as any).status = 404;
    throw error;
  }

  return {
    success: true,
    message: 'Password reset successfully',
  };
};

export const allAdmins = async ()  => {
    return await adminRepo.all();
}

export const findAdminById = async (id: string) => {
    return await adminRepo.findById(id);
}

export const updateAdminInfo =  async (id: string, data: UpdateQuery<IAdmin>) => {
    return await adminRepo.update(id, data);
}

export const deleteAdminById = async (id: string) => {
    return await adminRepo.delete(id);
};