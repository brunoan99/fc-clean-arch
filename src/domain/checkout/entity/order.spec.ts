import { Order } from "./order"
import { OrderItem } from "./order_item"

describe('Order', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new Order("", "1", [])
    }).toThrowError("Id is required")
  })

  test('Should throw error when customerId is empty', () => {
    expect(() => {
      new Order("1", "", [])
    }).toThrowError("CustomerId is required")
  })

  test('Should throw error when items are empty', () => {
    expect(() => {
      new Order("1", "1", [])
    }).toThrowError("Items are required")
  })

  test('Should return no error when value values are provided', () => {
    expect(() => {
      const item = new OrderItem("1", "1", "Pedra", 1, 1)
      new Order("1", "1", [item])
    }).not.toThrowError()
  })

  test('Should calculate total', () => {
    const item1 = new OrderItem("1", "1", "Pedra", 1, 3)
    const item2 = new OrderItem("2", "2", "Pedra", 2, 2)
    const item3 = new OrderItem("3", "3", "Pedra", 3, 1)
    const order = new Order("1", "1", [item1, item2, item3])
    expect(order.total()).toBe(10)
  })

  test('Should throw error if the item quantity is greater than 0', () => {
    expect(() => {
      const item1 = new OrderItem("1", "1", "Pedra", 1, 0)
      new Order("1", "1", [item1])
    }).toThrowError("Quantity must be greater than 0")
  })
})