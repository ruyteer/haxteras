import { NenbotModel } from "../models/nenbot";

export interface INenbotRepository {
  save(data: NenbotModel): Promise<void>;
  findMany(): Promise<NenbotModel[]>;
  findUnique(id: string): Promise<NenbotModel>;
  delete(id: string): Promise<void>;
}
