import { ProductServices } from "../../../data/services/product/product";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindUniqueProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const product = await this.productServices.findOne(id);

      return okResponse(product);
    } catch (error) {
      return badResponse(error);
    }
  }
}
