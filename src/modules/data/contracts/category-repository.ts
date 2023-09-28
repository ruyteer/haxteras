import { CategoryModel } from "../models/category";

export interface ICategoryRepository {
  save(category: CategoryModel): Promise<void>;
  findMany(): Promise<CategoryModel[]>;
  findUnique(id: string): Promise<CategoryModel>;
  findFirst(name: string): Promise<CategoryModel>;
  delete(id: string): Promise<void>;
}
