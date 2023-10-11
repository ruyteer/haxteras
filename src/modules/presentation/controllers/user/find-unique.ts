import { UserServices } from "../../../data/services/user/user";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindUniqueUserController implements Controller {
  constructor(private userServices: UserServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const user = await this.userServices.findOne(id);

      return okResponse(user);
    } catch (error) {
      return badResponse(error);
    }
  }
}
