import { UserModel } from "../models/user";

type UpdateUserModel = {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  nickname?: string;
};

export interface IUserRepository {
  save(data: UserModel): Promise<string>;
  findUnique(id: string): Promise<UserModel>;
  findMany(): Promise<UserModel[]>;
  delete(id: string): Promise<void>;
  findByCpf(cpf: string): Promise<string>;
  update(id: string, data?: UpdateUserModel): Promise<UserModel>;
}
