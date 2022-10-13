export type CustomerDTO = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}