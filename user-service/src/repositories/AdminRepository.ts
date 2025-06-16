import { IAdminRepository } from './interfaces/IAdminRepository';
import { Admin, IAdmin } from '../models/admin.model';

export class AdminRepository implements IAdminRepository {
  async findById(id: string): Promise<IAdmin | null> {
    return Admin.findById(id);
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return Admin.findOne({ email });
  }

  async create(AdminData: Partial<IAdmin>): Promise<IAdmin> {
    return Admin.create(AdminData);
  }

  async update(id: string, updates: Partial<IAdmin>): Promise<IAdmin | null> {
    return Admin.findByIdAndUpdate(id, updates, { new: true });
  }

  async all() : Promise<IAdmin[]> {
    return Admin.find();
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }
}
