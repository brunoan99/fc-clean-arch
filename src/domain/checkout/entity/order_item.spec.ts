import { OrderItem } from "./order_item"

describe('Order', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new OrderItem("", "1", "product1", 1, 1)
    }).toThrowError("Id is required")
  })

  test('Should throw error when productId is empty', () => {
    expect(() => {
      new OrderItem("1", "", "product1", 1, 1)
    }).toThrowError("ProductId is required")
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      new OrderItem("1", "1", "", 1, 1)
    }).toThrowError("Name is required")
  })

  test('Should throw error when price is less or equal zero', () => {
    expect(() => {
      new OrderItem("1", "1", "product1", 0, 1)
    }).toThrowError("Price must be greater than 0")
  })

  test('Should throw error when quantity is less or equal zero', () => {
    expect(() => {
      new OrderItem("1", "1", "product1", 1, 0)
    }).toThrowError("Quantity must be greater than 0")
  })
})