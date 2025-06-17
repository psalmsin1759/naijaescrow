import { Request, Response } from 'express';
import * as AdminService from '../services/admin.service';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await AdminService.createAdmin(req.body);
    res.status(201).json({ success: true, message: 'Admin created successfully', data: admin });
  } catch (error: any) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await AdminService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await AdminService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const result = await AdminService.resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const getAllAdmins = async (_: Request, res: Response) => {
  try {
    const admins = await AdminService.allAdmins();
    res.status(200).json({ success: true, message: 'Fetched successfully', data: admins });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const admin = await AdminService.findAdminById(req.params.id);
    if (!admin) {
       res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, message: 'Admin found', data: admin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const updated = await AdminService.updateAdminInfo(req.params.id, req.body);
    res.json({ success: true, message: 'Admin updated', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteAdminById(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
