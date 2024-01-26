import { NewsletterServices } from "../../../data/services/newsletter/newsletter";
import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class FindNewsletterController implements Controller {
  constructor(private newsletterServices: NewsletterServices) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const newsletter = await this.newsletterServices.find();

      return okResponse(newsletter);
    } catch (error) {
      return badResponse(error);
    }
  }
}
