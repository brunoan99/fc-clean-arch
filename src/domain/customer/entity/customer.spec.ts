import { NotificationError } from '../../@shared/notification/notification.error'
import { Address } from '../value-object/address'
import { Customer } from './customer'

describe('Customer', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new Customer("", "John")
    }).toThrowError("customer: Id is mandatory")
  })

  test('Should throw error when id name empty', () => {
    expect(() => {
      new Customer("123", "")
    }).toThrowError("customer: Name is mandatory")
  })

  test('Should change name', () => {
    const customer = new Customer("123", "John")
    customer.changeName("Jake Peralta")
    expect(customer.name).toBe("Jake Peralta")
  })

  test("Should customer to dont be activate as default", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.isActive()).toBeFalsy()
  })

  test("Should activate customer", () => {
    const customer = new Customer("1", "Customer 1")
    customer.changeAddress(new Address("Rua 1", 1, "cep1", "cidade"))
    customer.activate()
    expect(customer.isActive()).toBeTruthy()
  })

  test("Should activate customer return error if have no address", () => {
    const customer = new Customer("1", "Customer 1")
    expect(() => {
      customer.activate()
    }).toThrowError("customer: Address is required to activate a customer")
  })

  test("Should add reward points", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
  })
})