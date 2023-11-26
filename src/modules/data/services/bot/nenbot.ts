import { NenbotUseCases } from "../../../../domain/usecases/bot/nenbot";
import { INenbotRepository } from "../../contracts/nenbot-repository";
import { MissingParamError, NotFoundError } from "../../errors";
import { NenbotModel } from "../../models/nenbot";

export class NenbotServices implements NenbotUseCases {
  constructor(private nenbotRepository: INenbotRepository) {}

  async create(data: NenbotModel): Promise<void> {
    const requiredFields = ["name", "key", "days"];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new MissingParamError(field);
      }
    }

    await this.nenbotRepository.save(data);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const nenbotExists = await this.nenbotRepository.findUnique(id);

    if (!nenbotExists) {
      throw new NotFoundError("nenbot");
    }

    await this.nenbotRepository.delete(id);
  }

  async findAll(): Promise<NenbotModel[]> {
    const nenbots = await this.nenbotRepository.findMany();

    if (!nenbots) {
      throw new NotFoundError("nenbot");
    }

    return nenbots;
  }

  async findOne(id: string): Promise<NenbotModel> {
    if (!id) {
      throw new MissingParamError("id");
    }

    const nenbot = await this.nenbotRepository.findUnique(id);

    if (!nenbot) {
      throw new NotFoundError("nenbot");
    }

    return nenbot;
  }
}
