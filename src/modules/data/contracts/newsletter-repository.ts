import { NewsletterModel } from "../models/newsletter";

export interface INewsletterRepository {
  save(newsletter: NewsletterModel): Promise<void>;
  find(): Promise<NewsletterModel>;
  update(text: string, id: string): Promise<void>;
}
