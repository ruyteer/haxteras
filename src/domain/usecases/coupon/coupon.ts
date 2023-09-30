import { Coupon } from "../../entities/coupon";

export interface CouponUseCases {
  create(coupon: Coupon): Promise<void>;
  delete(id: string): Promise<void>;
  findUnique(id: string): Promise<Coupon>;
  findMany(): Promise<Coupon[]>;
  update(id: string, data: Coupon): Promise<void>;
}
