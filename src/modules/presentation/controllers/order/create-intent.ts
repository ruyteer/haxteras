import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateIntentController implements Controller {
  constructor(private createIntent: ICreateIntent) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { amount, userId, date, paymentMethod, products, productType } =
        req.body;

      const amountInCent = Math.round(amount * 100);

      const clientSecret = await this.createIntent.create({
        amount: amountInCent,
        userId,
        date,
        paymentMethod,
        products,
        productType,
      });

      return okResponse(clientSecret);
    } catch (error) {
      return badResponse(error);
    }
  }
}
