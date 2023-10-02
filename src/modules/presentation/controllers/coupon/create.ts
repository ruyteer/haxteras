import { CouponServices } from "../../../data/services/coupon/coupon";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateCouponController implements Controller {
  constructor(private couponServices: CouponServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { code, discount } = req.body;

      await this.couponServices.create({
        code,
        discount: parseInt(discount),
      });

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
