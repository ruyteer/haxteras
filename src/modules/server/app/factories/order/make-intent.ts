import { CreateIntent } from "../../../../infra/services/stripe/create-intent";
import { Controller } from "../../../../presentation/protocols";

export function makeIntent(controller): Controller {
  const services = new CreateIntent();
  return new controller(services);
}
