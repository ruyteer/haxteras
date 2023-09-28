import { ProductModel } from "../models/product";
import { UpdateProductModel } from "../models/update-product";

export interface IProductRepository {
  save(data: ProductModel, categoryId: string): Promise<void>;
  findUnique(id: string): Promise<ProductModel>;
  findMany(): Promise<ProductModel[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: UpdateProductModel): Promise<void>;
}
