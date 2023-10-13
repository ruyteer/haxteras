import { prisma } from "../../../config/prisma-client";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../data/contracts/user-repository";

export class UserRepository implements IUserRepository {
  async save(data: User): Promise<void> {
    await prisma.user.create({
      data: {
        cpf: data.cpf,
        email: data.email,
        name: data.name,
        phone: data.phone,
        surname: data.surname,
        address: {
          create: data.address,
        },
      },
    });
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
}
