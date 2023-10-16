export type IntentData = {
  amount: number;
  userId: string;
  date: string;
  paymentMethod: string;
  quantity: number;
  products: string[];
};

export interface ICreateIntent {
  create(data: IntentData): Promise<string>;
}
