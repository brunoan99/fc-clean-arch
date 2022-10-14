import { Product } from "./product";

describe('Product', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new Product("", "Product1", 0);
    }).toThrowError("product: Id is mandatory")
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      new Product("1", "", 0);
    }).toThrowError("product: Name is mandatory")
  })

  test('Should throw error when price is equal or less than zero', () => {
    expect(() => {
      new Product("1", "Product1", 0);
    }).toThrowError("Price is mandatory")
    expect(() => {
      new Product("1", "Product1", -1);
    }).toThrowError("product: Price is mandatory")
  })

  test('Should be able to change name', () => {
    const product = new Product("1", "Product1", 2);
    product.changeName("Product2")
    expect(product.name).toBe("Product2")
  })

  test('Should return error when change name was called with invalid name', () => {
    expect(() => {
      new Product("1", "Product1", 2).changeName("")
    }).toThrowError("product: Name is mandatory")
  })

  test('Should be able to change price', () => {
    const product = new Product("1", "Product1", 2);
    product.changePrice(10)
    expect(product.price).toBe(10)
  })

  test('Should return error when change price was called with invalid price', () => {
    expect(() => {
      new Product("1", "Product1", 2).changePrice(-1)
    }).toThrowError("product: Price is mandatory")
  })
})