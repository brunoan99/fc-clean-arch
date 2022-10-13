import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface"
import { MapToDTO } from "../@shared/utils/MapTODTO"
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto"

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const { id, name, price } = input
    const product = await this.productRepository.findById(id)
    product.changeName(name)
    product.changePrice(price)
    await this.productRepository.update(product)
    return MapToDTO.execute(product)
  }
}
