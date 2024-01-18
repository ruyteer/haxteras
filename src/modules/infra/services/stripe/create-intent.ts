import {
  ICreateIntent,
  IntentData,
} from "../../../presentation/contracts/create-intent";
import { Stripe } from "stripe";
const stripe = new Stripe(
  "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",
  { apiVersion: "2023-08-16" }
);

export class CreateIntent implements ICreateIntent {
  async create(data: IntentData): Promise<string> {
    try {
      const customer = await stripe.customers.create({
        metadata: {
          userId: data.userId,
        },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: "off_session",
        currency: "brl",
        amount: data.amount,
        payment_method_types: ["card"],
        metadata: {
          paymentMethod: data.paymentMethod,
          date: data.date,
          userId: data.userId,
          products: JSON.stringify(data.products),
          productType: data.productType,
        },
      });

      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(error);
    }
  }
}
