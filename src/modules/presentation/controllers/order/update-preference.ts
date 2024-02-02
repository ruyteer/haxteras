import { prisma } from "../../../../config/prisma-client";
import { ICreateIntent } from "../../contracts/create-intent";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO,
});

export class UpdatePreferenceController implements Controller {
  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { userId, orderId, preferenceId, products, code } = req.body;
      const productsParsed = JSON.parse(products);

      const preference = new Preference(client);

      const user = await prisma.user.findUnique({ where: { id: userId } });

      await preference.update({
        id: preferenceId,
        updatePreferenceRequest: {
          items: productsParsed,
          metadata: {
            order: orderId,
            items: productsParsed,
          },
          back_urls: {
            success: `https://haxtera.com/payment/success/${code}`,
            pending: `https://haxtera.com/payment/success/${code}`,
          },
          payer: {
            email: user.email,
            identification: {
              type: "cpf",
              number: user.cpf,
            },
            name: user.name,
            surname: user.surname,
          },
        },
      });

      console.log("Um cliente está indo pagar com mercado pago!");

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}
