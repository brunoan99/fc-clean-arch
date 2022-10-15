import { Validator } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";
import * as yup from "yup";

export class CustomerYupValidator implements Validator<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is mandatory"),
          name: yup.string().required('Name is mandatory'),
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
        },{
          abortEarly: false,
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "customer",
          message: error
        })
      })
    }
  }
}