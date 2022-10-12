import { ProductInterface } from "../entity/product-interface";
import { v4 as uuid } from "uuid"
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a": return new Product(uuid(), name, price);
      case "b": return new ProductB(uuid(), name, price);
      default: throw new Error(`Invalid type: ${type}`);
    }
  }
}