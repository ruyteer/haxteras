import { CategoryServices } from "../../../../data/services/category/category";
import { CategoryRepository } from "../../../../infra/repositories/category";
import { Controller } from "../../../../presentation/protocols";

export function makeCategoryController(controller): Controller {
  const repository = new CategoryRepository();
  const services = new CategoryServices(repository);
  return new controller(services);
}
