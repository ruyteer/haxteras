import { Newsletter } from "../../entities/newsletter";

export interface NewsletterUseCases {
  create(text: string): Promise<void>;
  update(text: string): Promise<void>;
  find(): Promise<Newsletter>;
}
