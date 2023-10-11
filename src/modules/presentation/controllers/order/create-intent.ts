import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateIntentController implements Controller {
  constructor(private createIntent: ICreateIntent) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { amount } = req.body;

      const amountInCent = Math.round(amount * 100);

      const clientSecret = await this.createIntent.create(amountInCent);

      return okResponse(clientSecret);
    } catch (error) {
      return badResponse(error);
    }
  }
}
