import { EventDispatcher } from "../../../@shared/event/event-dispatcher"
import { Customer } from "../../../customer/entity/customer"
import { CustomerCreatedEvent } from "../customer-created-event"
import { FirstConsoleLogWhenCustomerIsCreatedHandler } from "./first-console-log-when-customer-is-created-handler"

describe('First ConsoleLog When Customer Is Created Handler', () => {
  test('Should call console.log with correct data', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const sut = new FirstConsoleLogWhenCustomerIsCreatedHandler()
    const eventDispatcher = new EventDispatcher()
    eventDispatcher.register('CustomerCreatedEvent', sut)

    const customer = new Customer("1", "Customer 1")
    const event = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(event)
    expect(consoleSpy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated')
  })
})