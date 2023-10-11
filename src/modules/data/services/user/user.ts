import { UserUseCases } from "../../../../domain/usecases/user/user";
import { IUserRepository } from "../../contracts/user-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { UserModel } from "../../models/user";

export class UserServices implements UserUseCases {
  constructor(private userRepository: IUserRepository) {}

  async create(user: UserModel): Promise<void> {
    const requiredFields = [
      "name",
      "surname",
      "email",
      "phone",
      "cpf",
      "address",
    ];

    for (const field of requiredFields) {
      if (!user[field]) {
        throw new MissingParamError(field);
      }
    }

    await this.userRepository.save(user);
  }

  async findOne(id: string): Promise<UserModel> {
    if (!id) {
      throw new Error("Missing Param: id");
    }

    const user = await this.userRepository.findUnique(id);

    if (!user) {
      throw new NotFoundError("user");
    }

    return user;
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.userRepository.findMany();

    if (!users) {
      throw new Error(
        "We don't have users on database. Please, try again later!"
      );
    }

    return users;
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const user = await this.userRepository.findUnique(id);

    if (!user) {
      throw new NotFoundError("user");
    }

    await this.userRepository.delete(id);
  }
}
