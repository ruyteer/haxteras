import { prisma } from "../../../../config/prisma-client";
import { OrderServices } from "../../../data/services/order/order";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class SendOrderVoucherController implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { orderList } = req.body;
      const voucher = req.files.firebaseUrl;

      const orderListParse = JSON.parse(orderList);

      orderListParse.map(async (result) => {
        await prisma.order.update({
          where: { id: result },
          data: { voucher },
        });
      });
      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
