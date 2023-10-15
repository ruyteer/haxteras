import { OrderServices } from "../../../data/services/order/order";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class nome implements Controller {
  constructor(private orderServices: OrderServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.orderServices.delete(id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
