import { badResponse, okResponse } from "../../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class WebhookController implements Controller {
  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const event = req.body;

      switch (event.type) {
        case "payment_intent.created":
          break;
        case "payment_intent.succeeded":
          console.log("deu certo");
          break;
        default:
          throw new Error(`Unhandled event type ${event.type}`);
      }

      return okResponse({ received: true });
    } catch (error) {
      return badResponse(error);
    }
  }
}
