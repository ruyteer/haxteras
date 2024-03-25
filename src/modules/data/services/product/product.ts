import { ProductUseCases } from "../../../../domain/usecases/product/product";
import { IProductRepository } from "../../contracts/product-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { ProductModel } from "../../models/product";

export class ProductServices implements ProductUseCases {
  constructor(private productRepository: IProductRepository) {}

  async create(categoryId: string, product: ProductModel): Promise<void> {
    if (!categoryId) {
      throw new MissingParamError("categoryId");
    }

    const requiredFields = ["name", "stock", "price"];

    for (const field of requiredFields) {
      if (!product[field]) {
        throw new MissingParamError(field);
      }
    }

    await this.productRepository.save(product, categoryId);
  }

  async findOne(id: string): Promise<ProductModel> {
    if (!id) {
      throw new Error("Missing Param: id");
    }

    const product = await this.productRepository.findUnique(id);

    if (!product) {
      throw new NotFoundError("product");
    }

    return product;
  }

  async findAll(): Promise<ProductModel[]> {
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
      throw new MissingParamError("id");
    }

    const product = await this.productRepository.findUnique(id);

    if (!product) {
      throw new NotFoundError("product");
    }

    await this.productRepository.delete(id);
  }

  async update(data: ProductModel, id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const checkFields = [
      "name",
      "description",
      "stock",
      "price",
      "images",
      "avaiableStock",
    ];
    const productData = {};

    for (const field of checkFields) {
      if (data[field]) {
        productData[field] = data[field];
      }
    }

    await this.productRepository.update(id, productData);
  }
}
