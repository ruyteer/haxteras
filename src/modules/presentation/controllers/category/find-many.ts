import { CategoryServices } from "../../../data/services/category/category";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyCategoryController implements Controller {
  constructor(private categoryServices: CategoryServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const categories = await this.categoryServices.findAll();

      return okResponse(categories);
    } catch (error) {
      return badResponse(error);
    }
  }
}
