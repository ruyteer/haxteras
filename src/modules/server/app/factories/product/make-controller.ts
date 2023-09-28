import { ProductServices } from "../../../../data/services/product/product";
import { ProductRepository } from "../../../../infra/repositories/product";
import { Controller } from "../../../../presentation/protocols";

export function makeProductController(controller): Controller {
  const productRepository = new ProductRepository();
  const productServices = new ProductServices(productRepository);
  return new controller(productServices);
}
