import { prisma } from "../../../config/prisma-client";
import { Product } from "../../../domain/entities/product";
import { IProductRepository } from "../../data/contracts/product-repository";
import { UpdateProductModel } from "../../data/models/update-product";

export class ProductRepository implements IProductRepository {
  async save(data: Product, categoryId: string): Promise<void> {
    await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        images: data.images,
        categoryId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  async findMany(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findUnique(id: string): Promise<Product> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateProductModel): Promise<void> {
    await prisma.product.update({ where: { id }, data });
  }
}
