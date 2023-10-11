import { UserServices } from "../../../data/services/user/user";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class DeleteUserController implements Controller {
  constructor(private userServices: UserServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.userServices.delete(id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
