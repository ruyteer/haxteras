import { UserServices } from "../../../data/services/user/user";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateUserController implements Controller {
  constructor(private userServices: UserServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { name, surname, email, phone, cpf } = req.body;
      const address: AddressView = req.body.address;

      await this.userServices.create({
        name,
        surname,
        email,
        phone,
        cpf,
        address,
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
