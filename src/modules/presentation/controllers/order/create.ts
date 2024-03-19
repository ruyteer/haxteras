import { prisma } from "../../../../config/prisma-client";
import { OrderServices } from "../../../data/services/order/order";
import { sendDiscordMessage } from "../../../infra/services/bot/discord-webhook";
import { emitEvent } from "../../../server/socket";
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
        userIp,
      } = req.body;
      const data = req.body;
      req.files = req.files || {};

      const voucher = req.files.firebaseUrl || ["comprovante não enviado"];
      const productsParse = JSON.parse(products);
      console.log(products);
      console.log(productsParse);

      if (
        productsParse[0].type === "dashbot" ||
        productsParse[0].type === "nenbot"
      ) {
        const productId = `${productsParse[0].type} ${productsParse[0].day}`;
        const orderId = await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "pending",
            voucher: voucher[0],
            quantity: parseInt(quantity),
            userIp,
          },
          [productId],
          userId
        );

        await sendDiscordMessage({
          amount: parseFloat(amount),
          orderId: paymentIntent,
          paymentMethod,
          productName: productId,
          quantity,
          status: "Pendente",
        });

        emitEvent("new order", {
          amount: parseFloat(amount),
          orderId: paymentIntent,
          paymentMethod,
          productName: productId,
          quantity,
          status: "Pendente",
        });

        return okResponse(orderId);
      } else {
        console.log(data);
        const orderId = await this.orderServices.create(
          {
            amount: parseFloat(amount),
            date,
            paymentIntent,
            paymentMethod,
            status: "pending",
            voucher: voucher[0],
            quantity: parseInt(quantity),
            userIp,
          },
          productsParse,
          userId
        );

        const product = await prisma.product.findUnique({
          where: { id: productsParse[0] },
        });

        await sendDiscordMessage({
          amount: parseFloat(amount),
          orderId: paymentIntent,
          paymentMethod,
          productName: product.name,
          quantity,
          status: "Pendente",
        });
        emitEvent("new order", {
          amount: parseFloat(amount),
          orderId: paymentIntent,
          paymentMethod,
          productName: product.name,
          quantity,
          status: "Pendente",
        });

        return okResponse(orderId);
      }
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
