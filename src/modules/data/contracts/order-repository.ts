import { OrderModel } from "../models/order";

export interface IOrderRepository {
  create(
    order: OrderModel,
    products: string[],
    userId: string
  ): Promise<string>;
  findOne(id: string): Promise<OrderModel>;
  findAll(): Promise<OrderModel[]>;
  delete(id: string): Promise<void>;
}
