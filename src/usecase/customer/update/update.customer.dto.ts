export interface InputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}

export interface OutputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}