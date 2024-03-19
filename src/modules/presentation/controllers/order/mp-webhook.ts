import { prisma } from "../../../../config/prisma-client";
import { sendDiscordMessage } from "../../../infra/services/bot/discord-webhook";
import { NodemailerServices } from "../../../infra/services/email/nodemailer-services";
import { emitEvent } from "../../../server/socket";
import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO,
});

interface ItemsMetadata {
  id: string;
  title: string;
  picture_url: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export class MPWebhook implements Controller {
  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const response = req.body;
      console.log("Webhook foi chamado com sucesso!");
      console.log(response);

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: response.data.id });

      const orderId: string[] = JSON.parse(paymentData.metadata.order);
      const items: ItemsMetadata[] = paymentData.metadata.items;
      const userId = paymentData.metadata.user;
      const emailServices = new NodemailerServices();
      console.log({
        paymentData: paymentData,
        items: items,
        orderId: orderId,
      });

      orderId.map(async (result: string) => {
        console.log(result);
        const updatedOrder = await prisma.order.update({
          where: { id: result },
          data: { status: paymentData.status },
        });

        if (items[0].id === "nenbot") {
          const nenbots = await prisma.nenbot.findMany();

          const splittedStr = items[0].title.split(" ")[1];
          const filteredNenbots = nenbots.filter(
            (result) => result.days === parseInt(splittedStr)
          );

          let nenbotsFinallyArray = [];

          if (filteredNenbots.length < 1) {
            console.error("No have nenbots");
          } else {
            for (let index = 0; index < items[0].quantity; index++) {
              nenbotsFinallyArray.push(filteredNenbots[0]);
              await prisma.nenbot.delete({
                where: { id: filteredNenbots[0].id },
              });
              filteredNenbots.shift();
            }
          }

          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          await emailServices.sendNenbotMail(
            nenbotsFinallyArray,
            user,
            updatedOrder
          );

          return;
        } else if (items[0].id === "dashbot") return;

        const filteredItem = items.filter(
          (result) => updatedOrder.products[0] === result.id
        );
        const productData = await prisma.product.findUnique({
          where: { id: updatedOrder.products[0] },
        });

        await prisma.product.update({
          where: { id: updatedOrder.products[0] },
          data: {
            stock: productData.stock - filteredItem[0].quantity,
          },
        });

        await sendDiscordMessage({
          productName: productData.name,
          amount: updatedOrder.amount,
          orderId: updatedOrder.paymentIntent,
          quantity: updatedOrder.quantity,
          status: updatedOrder.status,
          paymentMethod: "Mercado Pago",
        });
        emitEvent("new order", {
          productName: productData.name,
          amount: updatedOrder.amount,
          orderId: updatedOrder.paymentIntent,
          quantity: updatedOrder.quantity,
          status: updatedOrder.status,
          paymentMethod: "Mercado Pago",
        });
      });

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
