export type intentResponse = {
  amount: number;
  userId: string;
  status: "succeeded" | "failed" | "pending";
  voucher: string;
};

export interface IStripeServices {
  findIntent(paymentIntent: string): Promise<intentResponse>;
}
