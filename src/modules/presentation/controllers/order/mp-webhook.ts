import { prisma } from "../../../../config/prisma-client";
import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2348908258126449-041219-4b97b3cbef8459c5def475afe3616243-305234564",
});

export class MPWebhook implements Controller {
  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const response = req.body;

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: response.data.id });

      const orderId = JSON.parse(paymentData.metadata.order_id);

      orderId.map(async (result) => {
        await prisma.order.update({
          where: { id: result },
          data: { status: paymentData.status },
        });
      });

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
