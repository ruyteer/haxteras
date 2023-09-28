import { CategoryUseCases } from "../../../../domain/usecases/category/category";
import { ICategoryRepository } from "../../contracts/category-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { CategoryModel } from "../../models/category";
import { ProductModel } from "../../models/product";

export class CategoryServices implements CategoryUseCases {
  constructor(private categoryRepository: ICategoryRepository) {}

  async create(category: CategoryModel): Promise<void> {
    if (!category.name) {
      throw new MissingParamError("name");
    }

    const categoryExists = await this.categoryRepository.findFirst(
      category.name
    );

    if (categoryExists) {
      throw new Error("Category is already exists!");
    }

    await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const category = await this.categoryRepository.findUnique(id);

    if (!category) {
      throw new NotFoundError("category");
    }

    await this.categoryRepository.delete(id);
  }

  async findAll(): Promise<CategoryModel[]> {
    const categories = await this.categoryRepository.findMany();

    if (!categories) {
      throw new Error(
        "We don't have categories on database. Please, try again later!"
      );
    }

    return categories;
  }

  async findAllProducts(id: string): Promise<ProductModel[]> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const products = await this.categoryRepository.findManyProducts(id);

    if (!products) {
      throw new Error(
        "We don't have products on this category. Please, try again later!"
      );
    }

    return products;
  }

  async findOne(id: string): Promise<CategoryModel> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const category = await this.categoryRepository.findUnique(id);

    if (!category) {
      throw new NotFoundError("category");
    }

    return category;
  }
}
