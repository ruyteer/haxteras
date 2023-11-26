import { OrderServices } from "../../../../data/services/order/order";
import { OrderRepository } from "../../../../infra/repositories/order";
import { Controller } from "../../../../presentation/protocols";

export function makeOrderController(controller): Controller {
  const productRepository = new OrderRepository();
  const productServices = new OrderServices(productRepository);
  return new controller(productServices);
}
