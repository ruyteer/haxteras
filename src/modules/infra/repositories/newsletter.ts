import { prisma } from "../../../config/prisma-client";
import { Newsletter } from "../../../domain/entities/newsletter";
import { INewsletterRepository } from "../../data/contracts/newsletter-repository";

export class NewsletterRepository implements INewsletterRepository {
  async save(newsletter: Newsletter): Promise<void> {
    await prisma.newsletter.create({ data: { text: newsletter.text } });
  }

  async find(): Promise<Newsletter> {
    const newsletter = await prisma.newsletter.findMany();

    return newsletter[0];
  }

  async update(text: string, id: string): Promise<void> {
    await prisma.newsletter.update({ where: { id }, data: { text } });
  }
}
