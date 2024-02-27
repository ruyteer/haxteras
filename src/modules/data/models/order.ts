import { Order } from "../../../domain/entities/order";

export type OrderModel = {
  date: string;
  status: "approved" | "canceled" | "refused" | "incomplete" | string;
  amount: number;
  paymentMethod: "card" | "pix" | string;
  voucher: string;
  paymentIntent: string;
  quantity: number;
  userIp?: string;
};
