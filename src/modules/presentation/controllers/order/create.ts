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
      const { paymentIntent, date, paymentMethod, products, quantity, userId } =
        req.body;

      const data = await this.stripeServices.findIntent(paymentIntent);

      await this.orderServices.create(
        {
          amount: data.amount,
          date,
          paymentIntent,
          paymentMethod,
          status: data.status,
          voucher: data.voucher,
          quantity: parseInt(quantity),
        },
        products,
        userId
      );

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
