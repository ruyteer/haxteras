interface ProductList {
  id: string;
  quantity: number;
  price: number;
}

export type IntentData = {
  amount: number;
  userId: string;
  date: string;
  paymentMethod: string;
  products: ProductList[];
  productType: string;
  userIp?: string;
};

export interface ICreateIntent {
  create(data: IntentData): Promise<string>;
}
