import { Category } from "../../entities/category";

export interface CategoryUseCases {
  create(category: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findOne(id: string): Promise<Category>;
  delete(id: string): Promise<void>;
}
