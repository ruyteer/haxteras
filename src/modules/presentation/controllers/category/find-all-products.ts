import { CategoryServices } from "../../../data/services/category/category";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindAllProductsCategoryController implements Controller {
  constructor(private categoryServices: CategoryServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const products = await this.categoryServices.findAllProducts(id);

      return okResponse(products);
    } catch (error) {
      return badResponse(error);
    }
  }
}
