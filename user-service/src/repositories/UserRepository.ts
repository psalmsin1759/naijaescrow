import { IUserRepository } from './interfaces/IUserRepository';
import { User, IUser } from '../models/user.model';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    return User.create(userData);
  }

  async update(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updates, { new: true });
  }

  async all() : Promise<IUser[]> {
    return User.find();
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}
