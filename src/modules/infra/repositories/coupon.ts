import { prisma } from "../../../config/prisma-client";
import { Coupon } from "../../../domain/entities/coupon";
import { ICouponRespository } from "../../data/contracts/coupon-repository";

export class CouponRepository implements ICouponRespository {
  async save(coupon: Coupon): Promise<void> {
    await prisma.coupon.create({ data: coupon });
  }

  async delete(id: string): Promise<void> {
    await prisma.coupon.delete({ where: { id } });
  }

  async findMany(): Promise<Coupon[]> {
    return await prisma.coupon.findMany();
  }

  async findUnique(id: string): Promise<Coupon> {
    return prisma.coupon.findUnique({ where: { id } });
  }

  async update(id: string, data: Coupon): Promise<void> {
    await prisma.coupon.update({ where: { id }, data });
  }
}
