import { OrderServices } from "../../../data/services/order/order";
import { IStripeServices } from "../../contracts/find-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class WebhookController implements Controller {
  constructor(
    private orderServices: OrderServices,
    private stripeServices: IStripeServices
  ) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const event = req.body;

      switch (event.type) {
        case "payment_intent.created":
          break;
        case "payment_intent.payment_failed":
          const paymentFailedData = event.data.object;
          const metadata = event.data.object.metadata;
          const failedIntentData = await this.stripeServices.findIntent(
            paymentFailedData.id
          );

          const { userId, products, quantity, paymentMethod, date } = metadata;

          const productsList = products.split(", ");

          await this.orderServices.create(
            {
              amount: paymentFailedData.amount / 100,
              date,
              paymentMethod,
              paymentIntent: paymentFailedData.id,
              quantity: parseInt(quantity),
              status: paymentFailedData.status,
              voucher: "Payment failed",
            },
            productsList,
            userId
          );

          break;
        case "payment_intent.succeeded":
          const responseData = event.data.object;

          const intentData = await this.stripeServices.findIntent(
            responseData.id
          );

          const metaData = event.data.object.metadata;

          const productsArray = metaData.products.split(", ");

          await this.orderServices.create(
            {
              amount: responseData.amount / 100,
              date: metaData.date,
              paymentMethod: metaData.paymentMethod,
              paymentIntent: responseData.id,
              quantity: parseInt(metaData.quantity),
              status: responseData.status,
              voucher: intentData.voucher,
            },
            productsArray,
            metaData.userId
          );

          break;

        default:
          throw new Error(`Unhandled event type ${event.type}`);
      }

      return okResponse({ received: true });
    } catch (error) {
      return badResponse(error);
    }
  }
}
