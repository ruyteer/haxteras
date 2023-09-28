import { ProductModel } from "../../../data/models/product";
import { ProductServices } from "../../../data/services/product/product";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const data: ProductModel = req.body;
      const { id } = req.params;

      await this.productServices.update(data, id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
