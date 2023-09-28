import { CategoryModel } from "../models/category";
import { ProductModel } from "../models/product";

export interface ICategoryRepository {
  save(category: CategoryModel): Promise<void>;
  findMany(): Promise<CategoryModel[]>;
  findUnique(id: string): Promise<CategoryModel>;
  findFirst(name: string): Promise<CategoryModel>;
  findManyProducts(id: string): Promise<ProductModel[]>;
  delete(id: string): Promise<void>;
}
