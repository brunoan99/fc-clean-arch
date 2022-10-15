import supertest from "supertest";
import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { CustomerValidatorFactory } from "../factories/customer.validator.factory";
import { Address } from "../value-object/address";

export class Customer extends Entity {

  private _name: string;
  private _address: Address | undefined;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super()
    this._id = id;
    this._name = name;
    this.validate()

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors)
    }
  }
  get id(): string { return this._id; }

  get name(): string { return this._name; }

  get rewardPoints(): number { return this._rewardPoints; }

  get address(): Address { return this._address; }

  changeAddress(address: Address) { this._address = address; }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }
  
  changeName(name: string) {
    if (name.split(' ').length <= 1) {
      this.notification.addError({
        context: "customer",
        message: "Invalid name, names must contain at least first and last name",
      })
    }
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors)
    }
    this._name = name;
  }

  activate() {
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required to activate a customer",
      })
    }
    if (this._id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required to activate a customer",
      })
    }
    if ( this._address === undefined) {
      this.notification.addError({
        context: "customer",
        message: "Address is required to activate a customer",
      })
    }
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors)
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number ) { this._rewardPoints += points; }
}