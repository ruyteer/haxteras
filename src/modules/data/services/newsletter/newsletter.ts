import { Newsletter } from "../../../../domain/entities/newsletter";
import { NewsletterUseCases } from "../../../../domain/usecases/newsletter/newsletter";
import { INewsletterRepository } from "../../contracts/newsletter-repository";
import { MissingParamError, NotFoundError } from "../../errors";

export class NewsletterServices implements NewsletterUseCases {
  constructor(private readonly newsletterRepository: INewsletterRepository) {}

  async create(text: string): Promise<void> {
    if (!text) {
      throw new MissingParamError("text");
    }

    return await this.newsletterRepository.save({ text });
  }

  async find(): Promise<Newsletter> {
    const newsletter = await this.newsletterRepository.find();

    if (!newsletter) {
      throw new NotFoundError("newsletter");
    }

    return newsletter;
  }

  async update(text: string): Promise<void> {
    if (!text) {
      throw new MissingParamError("text");
    }

    const newsletter = await this.newsletterRepository.find();

    await this.newsletterRepository.update(text, newsletter.id);
  }
}
