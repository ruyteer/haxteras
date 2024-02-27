import {
  ICreateIntent,
  IntentData,
} from "../../../presentation/contracts/create-intent";
import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2023-08-16" });

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
          userIp: data.userIp,
        },
      });

      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(error);
    }
  }
}
