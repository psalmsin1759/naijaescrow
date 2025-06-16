import  { IBusiness } from "../models/business.model";
import {  UpdateQuery } from 'mongoose';
import { BusinessRepository } from "../repositories/BusinessRepository";

const businessRepo = new BusinessRepository();

export const createBusiness = async (data: Partial<IBusiness>)  => {
   
    const businessEmail = await businessRepo.findByEmail(data.email!);
    if (!businessEmail){
        const error = new Error('No business found with this email');
        (error as any).status = 404;
        throw error;
    }

    return businessRepo.create(data);
    
}

export const allBusinesses = async ()  => {
    return await businessRepo.all();
}

export const findBusinessById = async (id: string) => {
    return await businessRepo.findById(id);
}

export const updateBusinessInfo =  async (id: string, data: UpdateQuery<IBusiness>) => {
    return await businessRepo.update(id, data);
}

export const deleteBusinessById = async (id: string) => {
    return await businessRepo.delete(id);
};