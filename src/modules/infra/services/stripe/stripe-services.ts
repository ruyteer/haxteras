import Stripe from "stripe";
import {
  IStripeServices,
  intentResponse,
} from "../../../presentation/contracts/find-intent";

export class StripeServices implements IStripeServices {
  async findIntent(paymentIntent: string): Promise<intentResponse> {
    try {
      const stripe = new Stripe(process.env.STRIPE_KEY, {
        apiVersion: "2023-08-16",
      });

      const paymentData = await stripe.charges.list({
        payment_intent: paymentIntent,
      });

      const { amount, customer, receipt_url, status } = paymentData.data[0];

      const convertedAmount = amount / 100;

      const customerList = await stripe.customers.list();

      const filteredCustomer = customerList.data.filter(
        (result) => result.id === customer
      );

      const userId = filteredCustomer[0].metadata.userId;

      return {
        amount: convertedAmount,
        voucher: receipt_url,
        userId,
        status,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
