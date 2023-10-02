import { CouponServices } from "../../../data/services/coupon/coupon";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class DeleteCouponController implements Controller {
  constructor(private couponServices: CouponServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      await this.couponServices.delete(id);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
