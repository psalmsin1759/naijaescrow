import  { IUser } from "../models/user.model";
import {  UpdateQuery } from 'mongoose';
import { UserRepository } from "../repositories/UserRepository";

const UserRepo = new UserRepository();

export const createUser = async (data: Partial<IUser>)  => {
   
    const UserEmail = await UserRepo.findByEmail(data.email!);
    if (UserEmail){
        const error = new Error('User found with this email');
        (error as any).status = 404;
        throw error;
    }

    return UserRepo.create(data);
    
}

export const allUsers = async ()  => {
    return await UserRepo.all();
}

export const findUserById = async (id: string) => {
    return await UserRepo.findById(id);
}

export const updateUserInfo =  async (id: string, data: UpdateQuery<IUser>) => {
    return await UserRepo.update(id, data);
}

export const deleteUserById = async (id: string) => {
    return await UserRepo.delete(id);
};