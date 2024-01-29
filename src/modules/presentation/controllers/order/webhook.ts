import { NenbotServices } from "../../../data/services/bot/nenbot";
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
    private nenbotServices: NenbotServices,
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
          console.log("metaData", metaData);

          if (metaData.productType === "product") {
            const productsObjectList = JSON.parse(metaData.products);

            productsObjectList.map(async (result) => {
              console.log(result.quantity);

              const orderData = {
                amount: result.price * result.quantity,
                date: metaData.date,
                paymentMethod: metaData.paymentMethod,
                paymentIntent: responseData.id,
                quantity: result.quantity,
                status: responseData.status,
                voucher: intentData.voucher,
              };
              return await this.orderServices.create(
                orderData,
                [result.id],
                metaData.userId
              );
            });

            const user = await this.userServices.findOne(metaData.userId);

            await this.nodemailerServices.sendMail(user);
          } else {
            const botProducts = JSON.parse(metaData.products);

            const orderData = {
              amount: responseData.amount / 100,
              date: metaData.date,
              paymentMethod: metaData.paymentMethod,
              paymentIntent: responseData.id,
              quantity: parseInt(botProducts[0].mdc),
              status: responseData.status,
              voucher: intentData.voucher,
            };

            const productId = `${botProducts[0].type} ${botProducts[0].day}`;

            await this.orderServices.create(
              orderData,
              [productId],
              metaData.userId
            );

            const user = await this.userServices.findOne(metaData.userId);

            if (metaData.productType === "Nenbot") {
              const nenbots = await this.nenbotServices.findAll();

              const splittedStr = metaData.products.split(" ")[1];
              const filteredNenbots = nenbots.filter(
                (result) => result.days === parseInt(splittedStr)
              );

              let nenbotsFinallyArray = [];

              if (filteredNenbots.length < 1) {
                console.error("No have nenbots");
              } else {
                for (
                  let index = 0;
                  index < parseInt(metaData.quantity);
                  index++
                ) {
                  nenbotsFinallyArray.push(filteredNenbots[0]);
                  await this.nenbotServices.delete(filteredNenbots[0].id);
                  filteredNenbots.shift();
                }
              }

              await this.nodemailerServices.sendNenbotMail(
                nenbotsFinallyArray,
                user,
                orderData
              );
            } else {
              await this.nodemailerServices.sendMail(user);
            }
          }

          break;

        default:
          throw new Error(`Unhandled event type ${event.type}`);
      }

      return okResponse({ received: true });
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
