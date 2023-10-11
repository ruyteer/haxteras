import { ICreateIntent } from "../../../presentation/contracts/create-intent";
import { Stripe } from "stripe";
const stripe = new Stripe(
  "sk_test_51NOmpNIRbkxCjPq71D3jc44UcCuhTib6x7mcDb2KxaT2Gm6cHqOPuo67ICyPuQE5Mco9IOOwrDBVghyaFEuW3YEn00AWHaKBl1",
  { apiVersion: "2023-08-16" }
);

export class CreateIntent implements ICreateIntent {
  async create(amount: number): Promise<string> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "brl",
        amount,
        payment_method_types: ["card"],
      });

      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(error);
    }
  }
}
