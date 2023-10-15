import { Order } from "../../../../domain/entities/order";
import { OrderUseCases } from "../../../../domain/usecases/order/order";
import { IOrderRepository } from "../../contracts/order-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { OrderModel } from "../../models/order";

export class OrderServices implements OrderUseCases {
  constructor(private orderRepository: IOrderRepository) {}

  async create(
    order: Order,
    products: string[],
    userId: string
  ): Promise<void> {
    const requiredFields = [
      "amount",
      "paymentIntent",
      "paymentMethod",
      "voucher",
      "status",
      "date",
    ];

    for (const field of requiredFields) {
      if (!order[field]) {
        throw new MissingParamError(field);
      }
    }

    if (!products) {
      throw new MissingParamError("products id list");
    }

    if (!userId) {
      throw new MissingParamError("user id");
    }

    await this.orderRepository.create(order, products, userId);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundError("order");
    }

    await this.orderRepository.delete(id);
  }

  async findAll(): Promise<OrderModel[]> {
    const orders = await this.orderRepository.findAll();

    if (!orders) {
      throw new NotFoundError("orders");
    }

    return orders;
  }

  async findOne(id: string): Promise<OrderModel> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundError("order");
    }

    return order;
  }
}
