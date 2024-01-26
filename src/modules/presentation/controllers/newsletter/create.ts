import { NewsletterServices } from "../../../data/services/newsletter/newsletter";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class CreateNewsletterController implements Controller {
  constructor(private newsletterServices: NewsletterServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const { text } = req.body;

      await this.newsletterServices.create(text);

      return okResponse();
    } catch (error) {
      return badResponse(error);
    }
  }
}
