import { Product } from "../../../../domain/product/entity/product";
import { ProductDTO } from "../product.dto";

export class MapToDTO {
  public static execute(entity: Product): ProductDTO {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price  
    }
  }
}