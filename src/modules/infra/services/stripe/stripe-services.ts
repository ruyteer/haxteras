import Stripe from "stripe";
import {
  IStripeServices,
  intentResponse,
} from "../../../presentation/contracts/find-intent";

export class StripeServices implements IStripeServices {
  async findIntent(paymentIntent: string): Promise<intentResponse> {
    try {
      const stripe = new Stripe(
        "sk_test_51NOmpNIRbkxCjPq71D3jc44UcCuhTib6x7mcDb2KxaT2Gm6cHqOPuo67ICyPuQE5Mco9IOOwrDBVghyaFEuW3YEn00AWHaKBl1",
        {
          apiVersion: "2023-08-16",
        }
      );

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
