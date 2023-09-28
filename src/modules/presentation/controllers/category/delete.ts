import { CategoryServices } from "../../../data/services/category/category";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class DeleCategoryController implements Controller {
  constructor(private categoryServices: CategoryServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.categoryServices.delete(id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
