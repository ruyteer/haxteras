import { prisma } from "../../../../config/prisma-client";
import { OrderServices } from "../../../data/services/order/order";
import { NodemailerServices } from "../../../infra/services/email/nodemailer-services";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class UpdateOrdersController implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;
      const emailServices = new NodemailerServices();

      const order = await prisma.order.update({
        where: { id },
        data: { status: "succeeded" },
      });

      const products = order.products[0].split(" ");

      if (products[0] === "nenbot") {
        const day = parseInt(products[1]);
        const quantity = order.quantity;

        const nenbots = await prisma.nenbot.findMany();

        const filteredNenbots = nenbots.filter((result) => result.days === day);

        let nenbotsFinallyArray = [];

        if (filteredNenbots.length < 1) {
          console.error("No have nenbots");
        } else {
          for (let index = 0; index < quantity; index++) {
            nenbotsFinallyArray.push(filteredNenbots[0]);
            await prisma.nenbot.delete({
              where: { id: filteredNenbots[0].id },
            });
            filteredNenbots.shift();
          }
        }

        const user = await prisma.user.findUnique({
          where: { id: order.userId },
        });

        await emailServices.sendNenbotMail(nenbotsFinallyArray, user, order);

        return okResponse();
      }

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
