import { CouponServices } from "../../../data/services/coupon/coupon";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class UpdateCouponController implements Controller {
  constructor(private couponServices: CouponServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { code, discount } = req.body;
      const { id } = req.params;

      await this.couponServices.update(id, {
        code,
        discount: parseInt(discount),
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
