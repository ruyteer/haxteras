import { NenbotServices } from "../../../data/services/bot/nenbot";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyNenbotController implements Controller {
  constructor(private nenbotServices: NenbotServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const nenbots = await this.nenbotServices.findAll();

      return okResponse(nenbots);
    } catch (error) {
      return badResponse(error);
    }
  }
}
