import { ProductDTO } from "../@shared/product.dto";

export interface InputListProductDTO {}

export interface OutputListProductDTO {
  products: ProductDTO[];
}