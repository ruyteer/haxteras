export interface ICreateIntent {
  create(amount: number): Promise<string>;
}
