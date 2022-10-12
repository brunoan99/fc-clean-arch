import { EventHandlerInterface } from "../../../@shared/event/event-handler-interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed-event";

export class ConsoleLogWhenCustomerAddressChangeHandler implements EventHandlerInterface {
  handle (event: CustomerAddressChangedEvent): void {
    const customer = event.eventData
    if (!customer.address) throw new Error('Customer must have a address')
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`)
  }
}