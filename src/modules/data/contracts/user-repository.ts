import { UserModel } from "../models/user";

export interface IUserRepository {
  save(data: UserModel): Promise<void>;
  findUnique(id: string): Promise<UserModel>;
  findMany(): Promise<UserModel[]>;
  delete(id: string): Promise<void>;
}
