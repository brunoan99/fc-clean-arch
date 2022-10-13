import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerDTO } from "../customer.dto";

export class MapToDTO {
  public static execute(entity: Customer): CustomerDTO {
    return {
      id: entity.id,
      name: entity.name,
      address: {
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zip: entity.address.zip,
      }
    }
  }
}