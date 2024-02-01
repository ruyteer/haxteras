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

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: response.data.id });

      const orderId: string[] = JSON.parse(paymentData.metadata.order);

      orderId.map(async (result: string) => {
        await prisma.order.update({
          where: { id: result },
          data: { status: paymentData.status },
        });
      });

      const items: ItemsMetadata[] = paymentData.metadata.items;

      const emailServices = new NodemailerServices();

      if (items[0].id === "nenbot") {
        // tratar nenbots
        return;
      }

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
