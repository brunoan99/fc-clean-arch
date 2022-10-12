import { SendEmailWhenProductIsCreatedHandler } from "../../product/events/handler/send-email-when-product-is-created-handler"
import { ProductCreatedEvent } from "../../product/events/product-created-event"
import { EventDispatcher } from "./event-dispatcher"

describe('Event Dispatcher', () => {
  test('Should register an event handler', () => {
    const sut = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    sut.register('ProductCreatedEvent', eventHandler)

    const registeredEvent = sut.getEventHandlers['ProductCreatedEvent']
    expect(registeredEvent).toBeDefined()
    expect(registeredEvent.length).toBe(1)
    expect(registeredEvent[0]).toMatchObject(eventHandler)
  })

  test('Should unregister an event handler', () => {
    const sut = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    sut.register('ProductCreatedEvent', eventHandler)
    const registeredEvent = sut.getEventHandlers['ProductCreatedEvent']
    expect(registeredEvent).toBeDefined()
    expect(registeredEvent.length).toBe(1)
    expect(registeredEvent[0]).toMatchObject(eventHandler)
    
    sut.unregister('ProductCreatedEvent', eventHandler)
    const actualEvents = sut.getEventHandlers['ProductCreatedEvent']
    expect(actualEvents).toEqual([])
    expect(actualEvents.length).toBe(0)
  })

  test('Should unregister an event handler', () => {
    const sut = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    sut.register('ProductCreatedEvent', eventHandler)
    let registeredEvent = sut.getEventHandlers['ProductCreatedEvent']
    expect(registeredEvent).toBeDefined()
    expect(registeredEvent.length).toBe(1)
    expect(registeredEvent[0]).toMatchObject(eventHandler)
    
    sut.unregisterAll()
    const actualEvents = sut.getEventHandlers
    expect(actualEvents).toEqual({})
  })

  test('Should notify all event handlers', () => {
    const sut = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    sut.register('ProductCreatedEvent', eventHandler)
    expect(sut.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      id: 1,
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
      createdAt: new Date()
    })
    sut.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalledTimes(1)
  })
})