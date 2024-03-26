import { ProductModel } from "../../../data/models/product";
import { ProductServices } from "../../../data/services/product/product";
import { emitEvent } from "../../../server/socket";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class UpdateProductController implements Controller {
  constructor(private productServices: ProductServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const data = req.body;
      const { id } = req.params;
      const image = req.files.firebaseUrl;

      await this.productServices.update(
        {
          name: data.name,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          description: data.description,
          images: image,
          stockAvaiable: data.avaiableStock,
        },
        id
      );

      emitEvent("new update", true);
      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
