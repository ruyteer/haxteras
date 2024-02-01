import { prisma } from "../../../../config/prisma-client";
import { NodemailerServices } from "../../../infra/services/email/nodemailer-services";
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

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: response.data.id });

      const orderId: string[] = JSON.parse(paymentData.metadata.order);
      const items: ItemsMetadata[] = paymentData.metadata.items;
      const emailServices = new NodemailerServices();
      console.log({
        paymentData: paymentData,
        items: items,
        orderId: orderId,
      });

      orderId.map(async (result: string) => {
        const updatedOrder = await prisma.order.update({
          where: { id: result },
          data: { status: paymentData.status },
        });

        if (items[0].id === "nenbot") {
          // tratar nenbots
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
      });

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
