import { Validator } from "../../@shared/validator/validator.interface";
import { Product } from "../entity/product";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
  static create(): Validator<Product> {
    return new ProductYupValidator()
  }
}