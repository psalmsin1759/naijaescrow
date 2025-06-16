import  { IUser, User } from "../models/user.model";
import {  UpdateQuery } from 'mongoose';



export const createUser = (data: Partial<IUser>) : Promise<IUser> => {
    return User.create(data);
}

export const allUsers = () : Promise<IUser[]> => {
    return User.find();
}

export const findUserById = (id: string): Promise<IUser | null> => {
    return User.findById(id);
}

export const updateUser = (id: string, data: UpdateQuery<IUser>) : Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, data, {new: true});
}

export const deleteUserById = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id).exec();
};