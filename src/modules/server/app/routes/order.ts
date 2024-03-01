import { Router } from "express";
import { makeIntent } from "../factories/order/make-intent";
import { CreateIntentController } from "../../../presentation/controllers/order/create-intent";
import { controller } from "../adapters/controller";
import { makeStripe } from "../factories/order/make-stripe";
import { CreateOrderController } from "../../../presentation/controllers/order/create";
import { makeWebhook } from "../factories/order/make-webhook";
import { upload } from "../../../infra/services/multer/multer-config";
import { middleware } from "../adapters/middleware";
import { makeUploadFile } from "../factories/middlewares/upload-file";
import { makeOrderController } from "../factories/order/make-order";
import { FindManyOrdersController } from "../../../presentation/controllers/order/find-many";
import { FindUniqueOrderController } from "../../../presentation/controllers/order/find-unique";
import { UpdateOrdersController } from "../../../presentation/controllers/order/update";
import { SendOrderVoucherController } from "../../../presentation/controllers/order/send-voucher";
import { CreatePreferenceController } from "../../../presentation/controllers/order/create-mp";
import { UpdatePreferenceController } from "../../../presentation/controllers/order/update-preference";
import { MPWebhook } from "../../../presentation/controllers/order/mp-webhook";
import { DeleteOrderController } from "../../../presentation/controllers/order/delete";

const orderRoutes = Router();

import Discord from "discord.js";

orderRoutes.post("/discord", (req, res) => {
  const webhookClient = new Discord.WebhookClient({
    url: "https://discord.com/api/webhooks/1157042352863580201/NsQsjOhU-MnYs7ZhIA5HCl7s-h7qBFT27Beim4xfdGEae419fsZ_4uPp8UrJrW5TMzJC",
  });

  const messageEmbed = new Discord.EmbedBuilder()
    .setColor("#fba901")
    .setTitle("Novo pedido! 🎉")
    .setURL("https://haxtera.com/admin/dashboard/order")
    .setDescription("Um novo pedido foi realizado em nosso site!")
    .addFields(
      { name: "📦 Produto", value: "Camisa", inline: true },
      { name: "💵 Preço", value: "$50.00", inline: true },
      { name: "📊 Quantidade", value: "4", inline: true },
      { name: "🧾 Status", value: "Aprovado", inline: true },
      { name: "📍 ID do pedido", value: "42462", inline: true }
    )
    .setTimestamp();

  webhookClient.send({
    embeds: [messageEmbed],
  });

  res.send();
});

orderRoutes.post(
  "/create/intent",

  controller(makeIntent(CreateIntentController))
);

orderRoutes.post("/webhook", controller(makeWebhook()));
orderRoutes.post("/mercadopago/webhook", controller(new MPWebhook()));

orderRoutes.post(
  "/create",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeStripe(CreateOrderController))
);

orderRoutes.post(
  "/update/:id",
  controller(makeOrderController(UpdateOrdersController))
);

orderRoutes.post("/preference", controller(new CreatePreferenceController()));
orderRoutes.post(
  "/preference/update",
  controller(new UpdatePreferenceController())
);

orderRoutes.get("/", controller(makeOrderController(FindManyOrdersController)));
orderRoutes.get(
  "/:id",
  controller(makeOrderController(FindUniqueOrderController))
);

orderRoutes.put(
  "/update/voucher",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeOrderController(SendOrderVoucherController))
);

orderRoutes.delete(
  "/delete/:id",
  controller(makeOrderController(DeleteOrderController))
);

export { orderRoutes };
