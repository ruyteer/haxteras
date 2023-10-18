import { OrderModel } from "../../data/models/order";
import { UserModel } from "../../data/models/user";

export interface INodemailerServices {
  sendMail(user: UserModel, order: OrderModel): Promise<void>;
}
