import { ProductServices } from "../../../data/services/product/product";
import { emitEvent } from "../../../server/socket";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class DeleteProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.productServices.delete(id);

      emitEvent("new update", true);
      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
