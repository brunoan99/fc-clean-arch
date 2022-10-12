import { OrderFactory as sut, OrderFactoryProps } from "./order-factory"
import { v4 as uuid } from "uuid"

describe('Order Factory', () => {
  test('Should create a order', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          productId: uuid(),
          name: "Product 1",
          price: 1,
          quantity: 1,
        }
      ]
    }
    const order = sut.create(orderProps)
    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
    expect(order.items.length).toEqual(1)
  })
})