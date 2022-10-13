import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface"
import { MapToDTO } from "../@shared/utils/MapTODTO"
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto"

export class FindProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const { id } = input
    const product = await this.productRepository.findById(id)
    return MapToDTO.execute(product)
  }
}
