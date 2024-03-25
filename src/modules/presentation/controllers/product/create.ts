import { ProductServices } from "../../../data/services/product/product";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { ProductViewModel } from "../../views/product";

export class CreateProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const data: ProductViewModel = req.body;
      const { id } = req.params;
      const files = req.files.firebaseUrl;

      await this.productServices.create(id, {
        name: data.name,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        description: data.description,
        images: files,
        avaiableStock: true,
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
