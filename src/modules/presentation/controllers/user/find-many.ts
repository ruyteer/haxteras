import { UserServices } from "../../../data/services/user/user";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyUserController implements Controller {
  constructor(private userServices: UserServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const users = await this.userServices.findAll();

      return okResponse(users);
    } catch (error) {
      return badResponse(error);
    }
  }
}
