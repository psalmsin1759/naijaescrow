import { Request, Response, NextFunction } from 'express';
import * as BusinessService from '../services/business.service';


export const createBusiness = async (req: Request, res: Response) => {
  try {
    const business = await BusinessService.createBusiness(req.body);
    res.status(201).json({success: true, message: "successful", data: business});
  } catch (error: any) {
    res.status(error.status || 500).json({success: false, message: error.message });
  }
};

export const getAllBusinesses = async (_: Request, res: Response) => {
  const businesses = await BusinessService.allBusinesses();
  res.json(businesses);
};

export const getBusinessById = async (req: Request, res: Response) => {
  try {
    const business = await BusinessService.findBusinessById(req.params.id);
    if (!business) {
       res.status(404).json({success: false, message: 'Business not found' });
    }else{
      res.json({success: true, message: "Successful", data: business});
    }
    
  } catch (error: any) {
    res.status(500).json({success: false, message: error.message });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const updated = await BusinessService.updateBusinessInfo(req.params.id, req.body);
    res.json({success: true, message: "Successful", data: updated});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    await BusinessService.deleteBusinessById(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
