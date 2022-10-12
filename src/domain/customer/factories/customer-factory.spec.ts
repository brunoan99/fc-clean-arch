import { Address } from "../value-object/address"
import { CustomerFactory as sut } from "./customer-factory"

describe('Customer Factory', () => {
  test('Should create a customer', () => {
    const product = sut.create("Customer 1")
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Customer 1")
    expect(product.address).not.toBeDefined()
    expect(product.constructor.name).toBe("Customer")
  })

  test('Should create a customer with address', () => {
    const address = new Address("Rua 1", 1, "zip", "city")
    const product = sut.createWithAddress("Customer 1", address)
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Customer 1")
    expect(product.address).toBe(address)
    expect(product.constructor.name).toBe("Customer")
  })
})