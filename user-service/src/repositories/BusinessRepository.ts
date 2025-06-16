import { IBusinessRepository } from './interfaces/IBusinessRepository';
import { Business, IBusiness } from '../models/business.model';

export class BusinessRepository implements IBusinessRepository {
  async findById(id: string): Promise<IBusiness | null> {
    return Business.findById(id);
  }

  async findByEmail(email: string): Promise<IBusiness | null> {
    return Business.findOne({ email });
  }

  async create(BusinessData: Partial<IBusiness>): Promise<IBusiness> {
    return Business.create(BusinessData);
  }

  async update(id: string, updates: Partial<IBusiness>): Promise<IBusiness | null> {
    return Business.findByIdAndUpdate(id, updates, { new: true });
  }

  async all() : Promise<IBusiness[]> {
    return Business.find();
  }

  async delete(id: string): Promise<void> {
    await Business.findByIdAndDelete(id);
  }
}
