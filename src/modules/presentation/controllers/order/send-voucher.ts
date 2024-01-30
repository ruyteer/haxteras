import { prisma } from "../../../../config/prisma-client";
import { OrderServices } from "../../../data/services/order/order";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class SendOrderVoucherController implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;
      const voucher = req.files.firebaseUrl;

      await prisma.order.update({
        where: { id },
        data: { voucher },
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
