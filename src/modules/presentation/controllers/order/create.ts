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
      const {
        date,
        paymentMethod,
        paymentIntent,
        products,
        quantity,
        userId,
        amount,
      } = req.body;
      const data = req.body;

      const voucher = req.files.firebaseUrl;

      if (products.includes("Dashbot") || products.includes("Nenbot")) {
        await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "succeeded",
            voucher: voucher[0],
            quantity: parseInt(quantity),
          },
          [products],
          userId
        );
      } else {
        await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "succeeded",
            voucher: voucher[0],
            quantity: parseInt(quantity),
          },
          JSON.parse(products),
          userId
        );
      }

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
