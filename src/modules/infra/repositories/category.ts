import { prisma } from "../../../config/prisma-client";
import { Category } from "../../../domain/entities/category";
import { ICategoryRepository } from "../../data/contracts/category-repository";
import { ProductModel } from "../../data/models/product";

export class CategoryRepository implements ICategoryRepository {
  async save(category: Category): Promise<void> {
    await prisma.category.create({ data: category });
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }

  async findFirst(name: string): Promise<Category> {
    return await prisma.category.findFirst({ where: { name } });
  }

  async findMany(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  async findManyProducts(id: string): Promise<ProductModel[]> {
    return await prisma.product.findMany({ where: { categoryId: id } });
  }

  async findUnique(id: string): Promise<Category> {
    return await prisma.category.findUnique({ where: { id } });
  }
}
