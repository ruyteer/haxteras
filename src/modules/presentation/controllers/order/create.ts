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
      const productsParse = JSON.parse(products);

      if (
        productsParse[0].type === "Dashbot" ||
        productsParse[0].type === "Nenbot"
      ) {
        const productId = `${productsParse[0].type} ${productsParse[0].day}`;
        await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "pending",
            voucher: voucher[0],
            quantity: parseInt(quantity),
          },
          [productId],
          userId
        );
      } else {
        console.log(data);
        await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "pending",
            voucher: voucher[0],
            quantity: parseInt(quantity),
          },
          productsParse,
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
