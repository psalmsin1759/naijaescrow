import { IUser } from '../../models/user.model';

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(userData: Partial<IUser>): Promise<IUser>;
  update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  all() : Promise <IUser[]>;
  delete(id: string): Promise<void>;
}
