import { ProductFactory } from "../../../domain/product/factories/product-factory"
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface"
import { MapToDTO } from "../@shared/utils/MapTODTO"
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto"

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const { name, price } = input
    const product = ProductFactory.creatProductA(name, price)
    await this.productRepository.create(product)
    return MapToDTO.execute(product)
  }
}
