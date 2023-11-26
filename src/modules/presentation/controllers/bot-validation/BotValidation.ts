import { Request, Response } from "express";
import { prisma } from "../../../../config/prisma-client";

export class BotValidationController {
  static async create(req: Request, res: Response) {
    try {
      const { dashbot, nenbot } = req.body;

      await prisma.avaibleBots.create({ data: { dashbot, nenbot } });
      res.send();
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async findMany(req: Request, res: Response) {
    const avaibleBots = await prisma.avaibleBots.findFirst();
    res.send(avaibleBots);
  }

  static async update(req: Request, res: Response) {
    try {
      const { dashbot, nenbot } = req.body;
      await prisma.avaibleBots.updateMany({
        data: { dashbot, nenbot },
      });
      res.send();
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
