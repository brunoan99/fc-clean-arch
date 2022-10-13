import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { MapToDTO } from "../@shared/utils/MapToDTO";
import { InputListCustomerDTO, OutputListCustomerDTO  } from "./list.customer.dto";

export class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll()
    return {
      customers: customers.map(MapToDTO.execute)
    }
  }
}