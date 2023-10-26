import { Nenbot } from "../../entities/nenbot";

export interface NenbotUseCases {
  create(data: Nenbot): Promise<void>;
  findAll(): Promise<Nenbot[]>;
  findOne(id: string): Promise<Nenbot>;
  delete(id: string): Promise<void>;
}
