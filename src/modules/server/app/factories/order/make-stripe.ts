import { OrderServices } from "../../../../data/services/order/order";
import { OrderRepository } from "../../../../infra/repositories/order";
import { StripeServices } from "../../../../infra/services/stripe/stripe-services";
import { Controller } from "../../../../presentation/protocols";

export function makeStripe(controller): Controller {
  const repository = new OrderRepository();
  const services = new OrderServices(repository);
  const stripe = new StripeServices();
  return new controller(services, stripe);
}
