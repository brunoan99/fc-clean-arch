import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factories/product.validator.factory";

export class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string { return this._id; }

  get name(): string { return this._name; }
  
  get price(): number { return this._price; }


  changeName(name: string) {
    this._name = name;
    this.validate()
    this.checkErrors()
  }

  changePrice(price: number) {
    this._price = price;
    this.validate()
    this.checkErrors()
  }

  private checkErrors(): void {
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  validate() {
    ProductValidatorFactory.create().validate(this)
    this.checkErrors()
  }
}