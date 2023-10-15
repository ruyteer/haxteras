export interface ICreateIntent {
  create(amount: number, userId: string): Promise<string>;
}
