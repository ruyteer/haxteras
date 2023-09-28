import { CategoryServices } from "../../../data/services/category/category";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindUniqueCategoryController implements Controller {
  constructor(private categoryServices: CategoryServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const category = await this.categoryServices.findOne(id);

      return okResponse(category);
    } catch (error) {
      return badResponse(error);
    }
  }
}
