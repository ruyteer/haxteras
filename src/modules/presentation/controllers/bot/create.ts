import { NenbotServices } from "../../../data/services/bot/nenbot";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateNenbotController implements Controller {
  constructor(private nenbotServices: NenbotServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { name, screen, key } = req.body;

      await this.nenbotServices.create({ name, screen, key });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
