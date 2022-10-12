import { Product } from "../entity/product";

export class ProductService {
  static increasePrices(products: Product[], percentage: number): void {
    products.forEach((p) => {p.changePrice((p.price * percentage) / 100 + p.price)});
  }
}