import { Order } from "../../entities/order";

type OrderModel = {
  date: string;
  status: "approved" | "canceled" | "refused" | "incomplete" | string;
  amount: number;
  paymentMethod: "card" | "pix" | string;
  voucher: string;
  paymentIntent: string;
  quantity: number;
};

export interface OrderUseCases {
  create(order: Order, products: string[], userId: string): Promise<void>;
  findOne(id: string): Promise<OrderModel>;
  findAll(): Promise<OrderModel[]>;
  delete(id: string): Promise<void>;
}
