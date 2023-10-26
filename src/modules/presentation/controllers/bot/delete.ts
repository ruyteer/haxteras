import { NenbotServices } from "../../../data/services/bot/nenbot";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class DeleteNenbotController implements Controller {
  constructor(private nenbotServices: NenbotServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.nenbotServices.delete(id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
