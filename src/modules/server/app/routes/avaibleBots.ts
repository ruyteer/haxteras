import { Router } from "express";
import { BotValidationController } from "../../../presentation/controllers/bot-validation/BotValidation";

const avaibleBotsRouter = Router();

avaibleBotsRouter.post("/create", BotValidationController.create);
avaibleBotsRouter.get("/", BotValidationController.findMany);
avaibleBotsRouter.put("/update", BotValidationController.update);

export { avaibleBotsRouter };
