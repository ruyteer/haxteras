import { OrderServices } from "../../../data/services/order/order";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindUniqueOrderController implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const order = await this.orderServices.findOne(id);

      return okResponse(order);
    } catch (error) {
      return badResponse(error);
    }
  }
}
