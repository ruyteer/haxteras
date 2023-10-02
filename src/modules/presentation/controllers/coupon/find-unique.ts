import { CouponServices } from "../../../data/services/coupon/coupon";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindUniqueCouponController implements Controller {
  constructor(private couponServices: CouponServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { id } = req.params;

      const coupon = await this.couponServices.findUnique(id);

      return okResponse(coupon);
    } catch (error) {
      return badResponse(error);
    }
  }
}
