import { Nenbot } from "../../../../domain/entities/nenbot";
import { User } from "../../../../domain/entities/user";
import { OrderModel } from "../../../data/models/order";
import { UserModel } from "../../../data/models/user";
import { INodemailerServices } from "../../../presentation/contracts/nodemailer-services";
import { transporter } from "./nodemailer.config";

export class NodemailerServices implements INodemailerServices {
  async sendMail(user: UserModel): Promise<void> {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Estilos CSS para o corpo do e-mail */
          body {
            font-family: "Arial", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
          }
    
          /* Estilos CSS para a área de conteúdo */
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            margin: 20px;
          }
    
          ul {
            list-style: none;
          }
    
          /* Estilos CSS para o cabeçalho */
          header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-radius: 10px 10px 0 0;
          }
    
          .resum {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: center;
            background-color: rgb(184, 183, 183);
            width: 100%;
            padding: 10px;
            margin-top: 20px;
          }
    
          .resum ul li {
            margin-left: -40px;
          }
    
          /* Estilos CSS para o conteúdo principal */
          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
        </style>
      </head>
    
      <body>
        <div class="container">
          <header>
            <h1>Compra Efetuada com Sucesso!</h1>
          </header>
          <div class="content">
            <p>Olá, ${user.name}!</p>
            <p>
              Sua compra foi efetuada com sucesso. <br />
              Agradecemos por escolher nossos produtos/serviços. 
  
            
            </p>
    
        
    
           
            <p>Obrigado por fazer negócios conosco!</p>
          </div>
        </div>
      </body>
    </html>
    
    `;

    transporter.sendMail({
      from: "Suporte Haxteras <haxteras@gmail.com>",
      to: user.email,
      subject: "Compra efetuada com sucesso!",
      html,
    });
  }

  async sendNenbotMail(
    nenbot: Nenbot[],
    user: User,
    order: OrderModel
  ): Promise<void> {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Estilos CSS para o corpo do e-mail */
          body {
            font-family: "Arial", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
          }
    
          /* Estilos CSS para a área de conteúdo */
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            margin: 20px;
          }
    
          ul {
            list-style: none;
          }
    
          /* Estilos CSS para o cabeçalho */
          header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-radius: 10px 10px 0 0;
          }
    
          .resum {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: center;
            background-color: rgb(184, 183, 183);
            width: 100%;
            padding: 10px;
            margin-top: 20px;
          }
    
          .resum ul li {
            margin-left: -40px;
          }
    
          /* Estilos CSS para o conteúdo principal */
          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
        </style>
      </head>
    
      <body>
        <div class="container">
          <header>
            <h1>Compra Efetuada com Sucesso!</h1>
          </header>
          <div class="content">
            <p>Olá, ${user.name}!</p>
            <p>
              Sua compra foi efetuada com sucesso. <br />
              Agradecemos por escolher nossos produtos/serviços. <br />
              <br />
              Segue abaixo a(s) key(s) para ativação do(s) seu(s) Nenbot(s):
            </p>
    
            ${nenbot.map((result) => {
              return `
            <p style="margin-top: 10px; margin-bottom: 20px">Key: ${result.key}</p>
            `;
            })}
    
            <div class="resum">
              <p>Detalhes da compra:</p>
              <ul>
                <li>Valor: R$ ${order.amount}</li>
                <li>Data da Compra: ${order.date}</li>
                <li>CPF do Comprador: ${user.cpf}</li>
                <li>Comprovante de compra: ${order.voucher}</li>
              </ul>
            </div>
            <p>Obrigado por fazer negócios conosco!</p>
          </div>
        </div>
      </body>
    </html>
    
    `;

    transporter.sendMail({
      from: "Suporte Haxteras <haxteras@gmail.com>",
      to: user.email,
      subject: "Compra efetuada com sucesso!",
      html,
    });
  }
}
