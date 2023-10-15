import { User } from "../../entities/user";

export interface UserUseCases {
  create(user: User): Promise<string>;
  findOne(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
