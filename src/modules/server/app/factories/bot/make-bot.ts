import { NenbotServices } from "../../../../data/services/bot/nenbot";
import { NenbotRepository } from "../../../../infra/repositories/nenbot";
import { Controller } from "../../../../presentation/protocols";

export function makeNenbotController(controller): Controller {
  const repository = new NenbotRepository();
  const services = new NenbotServices(repository);
  return new controller(services);
}
