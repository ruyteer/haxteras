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
      const data = req.body;
      const params = req.params;

      console.log(data);
      console.log(params);

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: data.data.id });

      console.log(paymentData);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
