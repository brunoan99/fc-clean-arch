import { Validator } from "../../@shared/validator/validator.interface";
import { Product } from "../entity/product";
import * as yup from "yup";

export class ProductYupValidator implements Validator<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is mandatory"),
          name: yup.string().required('Name is mandatory').test("empty-check", "Name is mandatory", s => s.length > 0),
          price: yup.number().required('Price is mandatory').test("greater-than-zero", "Price is mandatory", p => p > 0),
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },{
          abortEarly: false,
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "product",
          message: error
        })
      })
    }
  }
}