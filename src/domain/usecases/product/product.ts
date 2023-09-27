import { Product } from "../../entities/product";

export interface ProductUseCases {
  create(product: Product): Promise<void>;
  findOne(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  update(data: Product): Promise<void>;
}
