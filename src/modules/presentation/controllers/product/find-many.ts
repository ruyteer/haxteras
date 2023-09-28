import { ProductServices } from "../../../data/services/product/product";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const products = await this.productServices.findAll();

      return okResponse(products);
    } catch (error) {
      return badResponse(error);
    }
  }
}
