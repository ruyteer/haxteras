import { CouponServices } from "../../../../data/services/coupon/coupon";
import { CouponRepository } from "../../../../infra/repositories/coupon";
import { Controller } from "../../../../presentation/protocols";

export function makeCouponController(controller): Controller {
  const repository = new CouponRepository();
  const services = new CouponServices(repository);
  return new controller(services);
}
