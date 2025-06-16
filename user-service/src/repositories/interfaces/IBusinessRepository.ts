import { IBusiness } from '../../models/business.model';

export interface IBusinessRepository {
  findById(id: string): Promise<IBusiness | null>;
  findByEmail(email: string): Promise<IBusiness | null>;
  create(userData: Partial<IBusiness>): Promise<IBusiness>;
  update(id: string, updates: Partial<IBusiness>): Promise<IBusiness | null>;
  all() : Promise <IBusiness[]>;
  delete(id: string): Promise<void>;
}
