export interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}

export interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}