import { OrderServices } from "../../../data/services/order/order";
import { UserServices } from "../../../data/services/user/user";
import { IStripeServices } from "../../contracts/find-intent";
import { INodemailerServices } from "../../contracts/nodemailer-services";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class WebhookController implements Controller {
  constructor(
    private orderServices: OrderServices,
    private stripeServices: IStripeServices,
    private userServices: UserServices,
    private nodemailerServices: INodemailerServices
  ) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const event = req.body;

      switch (event.type) {
        case "payment_intent.created":
          break;
        case "payment_intent.payment_failed":
          const paymentFailedData = event.data.object;
          const stripeMetadata = event.data.object.metadata;

          const productsList = stripeMetadata.products.split(", ");

          await this.orderServices.create(
            {
              amount: paymentFailedData.amount / 100,
              date: stripeMetadata.date,
              paymentMethod: stripeMetadata.paymentMethod,
              paymentIntent: paymentFailedData.id,
              quantity: parseInt(stripeMetadata.quantity),
              status: "failed",
              voucher: "Payment failed",
            },
            productsList,
            stripeMetadata.userId
          );

          break;
        case "payment_intent.succeeded":
          const responseData = event.data.object;

          const intentData = await this.stripeServices.findIntent(
            responseData.id
          );

          const metaData = event.data.object.metadata;

          const productsArray = metaData.products.split(", ");

          const orderData = {
            amount: responseData.amount / 100,
            date: metaData.date,
            paymentMethod: metaData.paymentMethod,
            paymentIntent: responseData.id,
            quantity: parseInt(metaData.quantity),
            status: responseData.status,
            voucher: intentData.voucher,
          };

          await this.orderServices.create(
            orderData,
            productsArray,
            metaData.userId
          );

          const user = await this.userServices.findOne(metaData.userId);

          await this.nodemailerServices.sendMail(user, orderData);

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
