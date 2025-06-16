import  { IAdmin, Admin } from "../models/admin.model";
import {  UpdateQuery } from 'mongoose';



export const createAdmin = (data: Partial<IAdmin>) : Promise<IAdmin> => {
    return Admin.create(data);
}

export const allAdmins = () : Promise<IAdmin[]> => {
    return Admin.find();
}

export const findAdminByEmail = (email: string) : Promise<IAdmin | null> => {
    return Admin.findOne({email}).exec();
}

export const findAdminById = (id: string): Promise<IAdmin | null> => {
    return Admin.findById(id);
}

export const updateAdmin = (id: string, data: UpdateQuery<IAdmin>) : Promise<IAdmin | null> => {
    return Admin.findByIdAndUpdate(id, data, {new: true});
}

export const deleteAdminById = async (id: string): Promise<IAdmin | null> => {
  return Admin.findByIdAndDelete(id).exec();
};