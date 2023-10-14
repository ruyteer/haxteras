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
        address: [
          {
            address: address.address,
            cep: address.cep,
            city: address.city,
            country: address.country,
            neighborhood: address.neighborhood,
            number: parseInt(address.number),
            state: address.state,
            userId: address.userId,
          },
        ],
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
