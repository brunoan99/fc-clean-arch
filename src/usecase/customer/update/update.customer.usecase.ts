import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { MapToDTO } from "../@shared/utils/MapToDTO";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export class UpdateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const { id, name, address } = input
    const customer = await this.customerRepository.findById(id)
    customer.changeName(name)
    const addressEntity = new Address(address.street, address.number, address.zip, address.city)
    customer.changeAddress(addressEntity)
    await this.customerRepository.update(customer)
    return MapToDTO.execute(customer)
  }
}