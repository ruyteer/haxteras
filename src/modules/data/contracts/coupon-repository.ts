import { CouponModel } from "../models/coupon";

export interface ICouponRespository {
  save(coupon: CouponModel): Promise<void>;
  findUnique(id: string): Promise<CouponModel>;
  findMany(): Promise<CouponModel[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: CouponModel): Promise<void>;
}
