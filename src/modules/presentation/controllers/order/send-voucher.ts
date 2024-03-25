import { prisma } from "../../../../config/prisma-client";
import { OrderServices } from "../../../data/services/order/order";
import { emitEvent } from "../../../server/socket";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class SendOrderVoucherController implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { orderList } = req.body;
      const voucher = req.files.firebaseUrl || ["comprovante inválido"];
      console.log(orderList);
      const orderListParse = JSON.parse(orderList);

      console.log(orderListParse);

      orderListParse.map(async (result) => {
        await prisma.order.update({
          where: { id: result },
          data: { voucher: voucher[0] },
        });
      });
      emitEvent("new order", true);
      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
