import { EventDispatcher } from "../../../@shared/event/event-dispatcher"
import { Customer } from "../../../customer/entity/customer"
import { CustomerCreatedEvent } from "../customer-created-event"
import { SecondConsoleLogWhenCustomerIsCreatedHandler } from "./second-console-log-when-customer-is-created-handler"

describe('Second ConsoleLog When Customer Is Created Handler', () => {
  test('Should call console.log with correct data', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const sut = new SecondConsoleLogWhenCustomerIsCreatedHandler()
    const eventDispatcher = new EventDispatcher()
    eventDispatcher.register('CustomerCreatedEvent', sut)

    const customer = new Customer("1", "Customer 1")
    const event = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(event)
    expect(consoleSpy).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated')
  })
})