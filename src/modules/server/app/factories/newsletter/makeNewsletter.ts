import { NewsletterServices } from "../../../../data/services/newsletter/newsletter";
import { NewsletterRepository } from "../../../../infra/repositories/newsletter";
import { Controller } from "../../../../presentation/protocols";

export function makeNewsletterController(controller): Controller {
  const newsletterRepository = new NewsletterRepository();
  const newsletterServices = new NewsletterServices(newsletterRepository);
  return new controller(newsletterServices);
}
