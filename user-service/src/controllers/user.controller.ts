// controllers/user.controller.ts

import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.allUsers();
    res.json({
      success: true,
      message: 'Fetched all users',
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    if (!user) {
       res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await UserService.updateUserInfo(req.params.id, req.body);
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUserById(req.params.id);
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
