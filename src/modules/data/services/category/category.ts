import { CategoryUseCases } from "../../../../domain/usecases/category/category";
import { ICategoryRepository } from "../../contracts/category-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { CategoryModel } from "../../models/category";

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
