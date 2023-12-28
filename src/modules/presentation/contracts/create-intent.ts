export type IntentData = {
  amount: number;
  userId: string;
  date: string;
  paymentMethod: string;
  products: string[];
  productType: string;
};

export interface ICreateIntent {
  create(data: IntentData): Promise<string>;
}
