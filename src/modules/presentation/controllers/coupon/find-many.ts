import { CouponServices } from "../../../data/services/coupon/coupon";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindManyCouponController implements Controller {
  constructor(private couponServices: CouponServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const coupons = await this.couponServices.findMany();

      return okResponse(coupons);
    } catch (error) {
      return badResponse(error);
    }
  }
}
