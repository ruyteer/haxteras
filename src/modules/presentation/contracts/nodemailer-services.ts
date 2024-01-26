import { NenbotModel } from "../../data/models/nenbot";
import { OrderModel } from "../../data/models/order";
import { UserModel } from "../../data/models/user";

export interface INodemailerServices {
  sendMail(user: UserModel): Promise<void>;
  sendNenbotMail(
    nenbot: NenbotModel[],
    user: UserModel,
    order: OrderModel
  ): Promise<void>;
}
