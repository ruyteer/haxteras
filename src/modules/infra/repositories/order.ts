import { prisma } from "../../../config/prisma-client";
import { Order } from "../../../domain/entities/order";
import { IOrderRepository } from "../../data/contracts/order-repository";
import { OrderModel } from "../../data/models/order";

export class OrderRepository implements IOrderRepository {
  async create(
    order: Order,
    products: string[],
    userId: string
  ): Promise<void> {
    await prisma.order.create({
      data: {
        userId,
        products,
        amount: order.amount,
        date: order.date,
        paymentIntent: order.paymentIntent,
        paymentMethod: order.paymentMethod,
        status: order.status,
        voucher: order.voucher,
        quantity: order.quantity,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({ where: { id } });
  }

  async findAll(): Promise<OrderModel[]> {
    return await prisma.order.findMany();
  }

  async findOne(id: string): Promise<OrderModel> {
    return await prisma.order.findUnique({ where: { id } });
  }
}
