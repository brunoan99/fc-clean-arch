import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import { CustomerFactory } from "../../../domain/customer/factories/customer-factory";

export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const { name, address } = input 
    const addressEntity = new Address(address.street, address.number, address.zip, address.city)
    const customer = CustomerFactory.createWithAddress(name, addressEntity)
    await this.customerRepository.create(customer)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      }
    }
  }
}