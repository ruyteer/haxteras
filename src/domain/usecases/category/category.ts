import { Category } from "../../entities/category";
import { Product } from "../../entities/product";

export interface CategoryUseCases {
  create(category: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findAllProducts(id: string): Promise<Product[]>;
  findOne(id: string): Promise<Category>;
  delete(id: string): Promise<void>;
}
