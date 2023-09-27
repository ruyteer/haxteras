import { ProductModel } from "../models/product";

export interface IProductRepository {
  save(data: ProductModel): Promise<void>;
  findUnique(id: string): Promise<ProductModel>;
  findMany(): Promise<ProductModel[]>;
  delete(id: string): Promise<void>;
  update(data: ProductModel, id: string): Promise<void>;
}
