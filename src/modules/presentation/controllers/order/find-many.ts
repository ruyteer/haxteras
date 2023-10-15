import { OrderServices } from "../../../data/services/order/order";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class nome implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const orders = await this.orderServices.findAll();

      return okResponse(orders);
    } catch (error) {
      return badResponse(error);
    }
  }
}
