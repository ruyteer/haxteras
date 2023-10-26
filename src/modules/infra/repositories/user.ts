import { prisma } from "../../../config/prisma-client";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../data/contracts/user-repository";

export class UserRepository implements IUserRepository {
  async save(data: User): Promise<string> {
    const user = await prisma.user.create({
      data: {
        cpf: data.cpf,
        email: data.email,
        name: data.name,
        phone: data.phone,
        surname: data.surname,
        nickname: data.nickname,
        address: {
          create: data.address,
        },
      },
    });

    return user.id;
  }

  async delete(id: string): Promise<void> {
    await prisma.address.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({ where: { id } });
  }

  async findMany(): Promise<User[]> {
    const user = await prisma.user.findMany({
      include: {
        address: true,
      },
    });

    return user;
  }

  async findUnique(id: string): Promise<User> {
    return await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
  }

  async findByCpf(cpf: string): Promise<string> {
    const user = await prisma.user.findFirst({
      where: { cpf },
      include: {
        address: true,
      },
    });

    if (user) {
      return user.id;
    } else {
      return null;
    }
  }
}
