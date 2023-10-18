import { OrderServices } from "../../../../data/services/order/order";
import { UserServices } from "../../../../data/services/user/user";
import { OrderRepository } from "../../../../infra/repositories/order";
import { UserRepository } from "../../../../infra/repositories/user";
import { NodemailerServices } from "../../../../infra/services/email/nodemailer-services";
import { StripeServices } from "../../../../infra/services/stripe/stripe-services";
import { WebhookController } from "../../../../presentation/controllers/order/webhook";
import { Controller } from "../../../../presentation/protocols";

export function makeWebhook(): Controller {
  const repository = new OrderRepository();
  const user = new UserRepository();
  const userServices = new UserServices(user);
  const services = new OrderServices(repository);
  const stripe = new StripeServices();
  const nodemailer = new NodemailerServices();
  return new WebhookController(services, stripe, userServices, nodemailer);
}
