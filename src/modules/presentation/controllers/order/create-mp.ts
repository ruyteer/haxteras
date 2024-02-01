import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO,
});

export class CreatePreferenceController implements Controller {
  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { products } = req.body;
      const orderId = Math.floor(Math.random() * 100000).toFixed(0);
      console.log(products);
      const parsedProduct = JSON.parse(products);

      const preference = new Preference(client);

      const preferenceData = preference.create({
        body: {
          items: parsedProduct,
          back_urls: {
            success: `https://haxtera.com/payment/success/${orderId}`,
            pending: `https://haxtera.com/payment/success/${orderId}`,
          },
          auto_return: "approved",
          notification_url: "https://api.haxtera.com/order/mercadopago/webhook",
          payment_methods: {
            excluded_payment_methods: [
              {
                id: "pix",
              },
              {
                id: "bolbradesco",
              },
              {
                id: "pec",
              },
            ],
            excluded_payment_types: [
              {
                id: "debit_card",
              },
            ],
            installments: 12,
          },
        },
      });

      const preferenceId = (await preferenceData).id;

      return okResponse(preferenceId);
    } catch (error) {
      return badResponse(error);
    }
  }
}
