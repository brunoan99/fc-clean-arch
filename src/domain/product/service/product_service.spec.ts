import { Product } from "../entity/product"
import { ProductService } from "./product_service"

describe('Product Service', () => {
  test('Should change all products prices', () => {
    const product1 = new Product("1", "Product1", 10)
    const product2 = new Product("2", "Product2", 20)
    const products = [product1, product2]
    ProductService.increasePrices(products, 100)
    expect(product1.price).toEqual(20)
    expect(product2.price).toEqual(40)
  })
})