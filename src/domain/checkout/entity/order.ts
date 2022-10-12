import { OrderItem } from "./order_item";

export class Order {
  
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate()
  }

  get id(): string { return this._id; }

  get customerId(): string { return this._customerId; }

  get items(): OrderItem[] { return this._items; }

  changeItems(items: OrderItem[]) {
    this._items = items;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required')
    }
    if (this._items.length === 0) {
      throw new Error('Items are required')
    }
    if (this._items.some(i => i.quantity <= 0)) {
      throw new Error('Quantity must be greater than 0')
    }
  }

  total (): number {
    return this._items.reduce((acc ,item) => acc + item.total, 0)
  }
}