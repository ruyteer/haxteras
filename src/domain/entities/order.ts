export type Order = {
  date: string;
  status: "succeeded" | "failed" | "pending";
  amount: number;
  paymentMethod: "card" | "pix";
  voucher: string;
  paymentIntent: string;
  quantity: number;
};
