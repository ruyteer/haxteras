import { CategoryModel } from "../../../data/models/category";
import { CategoryServices } from "../../../data/services/category/category";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateCategoryController implements Controller {
  constructor(private categoryServices: CategoryServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const data: CategoryModel = req.body;

      await this.categoryServices.create(data);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
