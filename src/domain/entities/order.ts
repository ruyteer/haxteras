export type Order = {
  date: string;
  status: "approved" | "canceled" | "refused" | "incomplete";
  amount: number;
  paymentMethod: "card" | "pix";
  voucher: string;
  paymentIntent: string;
};
