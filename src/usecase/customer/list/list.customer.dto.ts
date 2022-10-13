import { CustomerDTO } from "../@shared/customer.dto";

export interface InputListCustomerDTO {}

export interface OutputListCustomerDTO {
  customers: CustomerDTO[];
}