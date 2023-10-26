import { prisma } from "../../../config/prisma-client";
import { Nenbot } from "../../../domain/entities/nenbot";
import { INenbotRepository } from "../../data/contracts/nenbot-repository";

export class NenbotRepository implements INenbotRepository {
  async delete(id: string): Promise<void> {
    await prisma.nenbot.delete({ where: { id } });
  }

  async findMany(): Promise<Nenbot[]> {
    return await prisma.nenbot.findMany();
  }

  async findUnique(id: string): Promise<Nenbot> {
    return await prisma.nenbot.findUnique({ where: { id } });
  }

  async save(data: Nenbot): Promise<void> {
    await prisma.nenbot.create({ data });
  }
}
