import { OrderServices } from "../../../data/services/order/order";
import { IStripeServices } from "../../contracts/find-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateOrderController implements Controller {
  constructor(
    private orderServices: OrderServices,
    private stripeServices: IStripeServices
  ) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { paymentIntent, date, paymentMethod, products } = req.body;

      const data = await this.stripeServices.findIntent(paymentIntent);

      await this.orderServices.create(
        {
          amount: data.amount,
          date,
          paymentIntent,
          paymentMethod,
          status: data.status,
          voucher: data.voucher,
        },
        products,
        data.userId
      );

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
