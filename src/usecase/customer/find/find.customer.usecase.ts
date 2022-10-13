import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { MapToDTO } from "../@shared/utils/MapToDTO";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.findById(input.id)
    return MapToDTO.execute(customer)
  }
}