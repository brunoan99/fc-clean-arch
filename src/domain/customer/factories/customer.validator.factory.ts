import { Validator } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";
import { CustomerYupValidator } from "../validator/customer.yup.validator";

export class CustomerValidatorFactory {
  static create(): Validator<Customer> {
    return new CustomerYupValidator()
  }
}