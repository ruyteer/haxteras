import {
  ICreateIntent,
  IntentData,
} from "../../../presentation/contracts/create-intent";
import { Stripe } from "stripe";
const stripe = new Stripe(
  "sk_test_51NOmpNIRbkxCjPq71D3jc44UcCuhTib6x7mcDb2KxaT2Gm6cHqOPuo67ICyPuQE5Mco9IOOwrDBVghyaFEuW3YEn00AWHaKBl1",
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
