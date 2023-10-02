import { CouponUseCases } from "../../../../domain/usecases/coupon/coupon";
import { ICouponRespository } from "../../contracts/coupon-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { CouponModel } from "../../models/coupon";

export class CouponServices implements CouponUseCases {
  constructor(private couponRepository: ICouponRespository) {}

  async create(coupon: CouponModel): Promise<void> {
    const requiredFields = ["code", "discount"];

    for (const field of requiredFields) {
      if (!coupon[field]) {
        throw new MissingParamError(field);
      }
    }

    await this.couponRepository.save(coupon);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const coupon = await this.couponRepository.findUnique(id);

    if (!coupon) {
      throw new NotFoundError("coupon");
    }

    await this.couponRepository.delete(id);
  }

  async findMany(): Promise<CouponModel[]> {
    const coupons = await this.couponRepository.findMany();

    if (!coupons) {
      throw new Error("We don't have coupons on database. Try again later!");
    }

    return coupons;
  }

  async findUnique(id: string): Promise<CouponModel> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const coupon = await this.findUnique(id);

    if (!coupon) {
      throw new NotFoundError("coupon");
    }

    return coupon;
  }

  async update(id: string, data: CouponModel): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const coupon = await this.couponRepository.findUnique(id);

    if (!coupon) {
      throw new NotFoundError("coupon");
    }

    await this.couponRepository.update(id, data);
  }
}
