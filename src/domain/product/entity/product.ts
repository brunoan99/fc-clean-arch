import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";

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
    this.validateName(name)
    this.checkErrors()
    this._name = name;
  }

  changePrice(price: number) {
    this.validatePrice(price)
    this.checkErrors()
    this._price = price;
  }

  private validateId(id: string): void {
    if (id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is mandatory",
      })
    }
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Name is mandatory",
      })
    }
  }

  private validatePrice(price: number) {
    if (price <= 0) {
      this.notification.addError({
        context: "product",
        message: "Price is mandatory",
      })
    }
  }

  private checkErrors(): void {
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  validate() {
    this.validateId(this._id)
    this.validateName(this._name)
    this.validatePrice(this._price)
    this.checkErrors()
  }
}