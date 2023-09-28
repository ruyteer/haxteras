import { httpRequest, httpResponse } from "./http";

export interface Controller {
  handle(req: httpRequest): Promise<httpResponse>;
}
