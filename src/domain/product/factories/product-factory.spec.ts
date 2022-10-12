import { ProductFactory as sut } from "./product-factory"

describe('Product Factory', () => {
  test('Should create a standard product', () => {
    const product = sut.create("a", "Product A", 1)
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(1)
    expect(product.constructor.name).toBe("Product")
  })

  test('Should create a product type b', () => {
    const product = sut.create("b", "Product B", 2)
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product B")
    expect(product.price).toBe(4)
    expect(product.constructor.name).toBe("ProductB")
  })

  test('Should return a error if the provided type dont match with existing', () => {
    expect(() => {
      sut.create("c", "Product B", 2)
    }).toThrow('Invalid type: c')
  })
})