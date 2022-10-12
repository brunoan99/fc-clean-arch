import { EventDispatcher } from "../../../@shared/event/event-dispatcher"
import { Address } from "../../value-object/address"
import { Customer } from "../../../customer/entity/customer"
import { CustomerAddressChangedEvent } from "../customer-address-changed-event"
import { ConsoleLogWhenCustomerAddressChangeHandler } from "./console-log-when-address-changed-handler"

describe('Console Log When Address Change Handler Event', () => {
  test('Should call console.log with correct data', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const sut = new ConsoleLogWhenCustomerAddressChangeHandler()
    const eventDispatcher = new EventDispatcher()
    eventDispatcher.register('CustomerAddressChangedEvent', sut)

    const customer = new Customer("1", "Customer 1")
    const address = new Address("Rua 1", 1, "zip", "city")
    customer.changeAddress(address)
    const event = new CustomerAddressChangedEvent(customer)
    eventDispatcher.notify(event)
    expect(consoleSpy).toHaveBeenCalledWith(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`)
  })

  test('Should return a error if the customer provided to event do not contain a address', () => {
    const sut = new ConsoleLogWhenCustomerAddressChangeHandler()
    const eventDispatcher = new EventDispatcher()
    eventDispatcher.register('CustomerAddressChangedEvent', sut)

    const customer = new Customer("1", "Customer 1")
    const event = new CustomerAddressChangedEvent(customer)
    expect(() => {
      eventDispatcher.notify(event)
    }).toThrow("Customer must have a address")
  })
})