import { WebhookClient, EmbedBuilder } from "discord.js";

interface DiscordData {
  productName: string;
  amount: number;
  quantity: number;
  status: string;
  orderId: string;
  paymentMethod: string;
}

export async function sendDiscordMessage(data: DiscordData) {
  const webhookClient = new WebhookClient({
    url: "https://discord.com/api/webhooks/1157042352863580201/NsQsjOhU-MnYs7ZhIA5HCl7s-h7qBFT27Beim4xfdGEae419fsZ_4uPp8UrJrW5TMzJC",
  });

  const messageEmbed = new EmbedBuilder()
    .setColor("#fba901")
    .setTitle("Novo pedido! 🎉")
    .setURL("https://haxtera.com/admin/dashboard/order")
    .setDescription("Um novo pedido foi realizado em nosso site!")
    .addFields(
      { name: "📦 Produto", value: data.productName, inline: true },
      { name: "💵 Preço", value: data.amount.toFixed(2), inline: true },
      { name: "📊 Quantidade", value: data.quantity.toString(), inline: true },
      { name: "🧾 Status", value: data.status, inline: true },
      { name: "📍 ID do pedido", value: data.orderId, inline: true }
    )
    .setTimestamp();

  webhookClient.send({
    embeds: [messageEmbed],
  });
}
