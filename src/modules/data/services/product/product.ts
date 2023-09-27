import { Product } from "../../../../domain/entities/product";
import { ProductUseCases } from "../../../../domain/usecases/product/product";
import { IProductRepository } from "../../contracts/product-repository";

export class ProductServices implements ProductUseCases {
  constructor(private productRepository: IProductRepository) {}

  async create(product: Product): Promise<void> {
    const requiredFields = ["name", "description", "stock", "price", "images"];

    for (const field of requiredFields) {
      if (!product[field]) {
        throw new Error(`Missing Param: ${field}`);
      }
    }

    await this.productRepository.save(product);
  }

  async findOne(id: string): Promise<Product> {
    if (!id) {
      throw new Error("Missing Param: id");
    }

    const product = await this.productRepository.findUnique(id);

    if (!product) {
      throw new Error("Product doesn't exists. Please, send a valid id!");
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.findMany();

    if (!products) {
      throw new Error(
        "We don't have products on database. Please, try again later!"
      );
    }

    return products;
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error("Missing Param: id");
    }

    const product = await this.productRepository.findUnique(id);

    if (!product) {
      throw new Error("Product doesn't exists. Please, send a valid id!");
    }

    await this.productRepository.delete(id);
  }

  async update(data: Product, id: string): Promise<void> {
    if (!id) {
      throw new Error("Missing Param: id");
    }

    const checkFields = ["name", "description", "stock", "price", "images"];
    const productData = {};

    for (const field of checkFields) {
      if (data[field]) {
        productData[field] = data[field];
      }
    }

    await this.productRepository.update(id, productData);
  }
}
