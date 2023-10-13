import { UserServices } from "../../../../data/services/user/user";
import { UserRepository } from "../../../../infra/repositories/user";
import { Controller } from "../../../../presentation/protocols";

export function makeUserController(controller): Controller {
  const repository = new UserRepository();
  const services = new UserServices(repository);
  return new controller(services);
}
