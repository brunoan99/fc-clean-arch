import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { MapToDTO } from "../@shared/utils/MapTODTO";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export class ListProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll()
    return {
      products: products.map(MapToDTO.execute)
    }
  }
}
