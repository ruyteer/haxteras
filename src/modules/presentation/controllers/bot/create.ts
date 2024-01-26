import { NenbotServices } from "../../../data/services/bot/nenbot";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateNenbotController implements Controller {
  constructor(private nenbotServices: NenbotServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { name, days } = req.body;
      const keys: string = req.body.key;

      const splittedKeys = keys.split(" ");

      splittedKeys.forEach(async (key) => {
        await this.nenbotServices.create({ name, days: parseInt(days), key });
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
