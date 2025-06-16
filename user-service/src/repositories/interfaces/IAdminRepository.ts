import { IAdmin } from '../../models/admin.model';

export interface IAdminRepository {
  findById(id: string): Promise<IAdmin | null>;
  findByEmail(email: string): Promise<IAdmin | null>;
  create(userData: Partial<IAdmin>): Promise<IAdmin>;
  update(id: string, updates: Partial<IAdmin>): Promise<IAdmin | null>;
  all() : Promise <IAdmin[]>;
  delete(id: string): Promise<void>;
}
