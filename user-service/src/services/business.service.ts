import  { IBusiness, Business } from "../models/business.model";
import {  UpdateQuery } from 'mongoose';



export const createBusiness = (data: Partial<IBusiness>) : Promise<IBusiness> => {
    return Business.create(data);
}

export const allBusinesses = () : Promise<IBusiness[]> => {
    return Business.find();
}

export const findBusinessById = (id: string): Promise<IBusiness | null> => {
    return Business.findById(id);
}

export const updateBusinessInfo = (id: string, data: UpdateQuery<IBusiness>) : Promise<IBusiness | null> => {
    return Business.findByIdAndUpdate(id, data, {new: true});
}

export const deleteBusinessById = async (id: string): Promise<IBusiness | null> => {
  return Business.findByIdAndDelete(id).exec();
};