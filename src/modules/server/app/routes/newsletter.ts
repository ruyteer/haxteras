import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeNewsletterController } from "../factories/newsletter/makeNewsletter";
import { CreateNewsletterController } from "../../../presentation/controllers/newsletter/create";
import { FindNewsletterController } from "../../../presentation/controllers/newsletter/find";
import { UpdateNewsletterController } from "../../../presentation/controllers/newsletter/update";

const newsletterRoutes = Router();

newsletterRoutes.post(
  "/create",
  controller(makeNewsletterController(CreateNewsletterController))
);

newsletterRoutes.get(
  "/",
  controller(makeNewsletterController(FindNewsletterController))
);

newsletterRoutes.put(
  "/update",
  controller(makeNewsletterController(UpdateNewsletterController))
);

export { newsletterRoutes };
