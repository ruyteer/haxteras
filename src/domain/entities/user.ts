type Address = {
  country: string;
  cep: string;
  address: string;
  number: number;
  state: string;
  city: string;
  neighborhood: string;
  userId: string;
};

export type User = {
  name: string;
  surname: string;
  email: string;
  address?: Address[];
  phone: string;
  cpf: string;
  nickname?: string;
};
