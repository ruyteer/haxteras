import { ICreateIntent } from "../../../presentation/contracts/create-intent";
import { Stripe } from "stripe";
const stripe = new Stripe(
  "pk_test_51NOmpNIRbkxCjPq7BY4L1E7CzVhvF5eOxPdwJTBYDMZhPuNKh7MIjCWJGCsCmaZGt80w8a801PWwCkvW84J6vQNw00ThyuQ1HC",
  { apiVersion: "2023-08-16" }
);

export class CreateIntent implements ICreateIntent {
  async create(amount: number): Promise<string> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "brl",
        amount,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(error);
    }
  }
}
