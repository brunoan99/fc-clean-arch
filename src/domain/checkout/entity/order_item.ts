export class OrderItem {
  
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, productId: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._productId.length === 0) {
      throw new Error('ProductId is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._price <= 0) {
      throw new Error('Price must be greater than 0');
    }
    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  updatePrice(price: number): void {
    if (this._price <= 0) {
      throw new Error('Price needs to be greater than 0');
    }
    this._price = price
  }

  updateQuantity(quantity: number): void {
    if (this._quantity <= 0) {
      throw new Error('Quantity needs to be greater than 0');
    }
    this._quantity = quantity
  }

  updateName(name: string): void {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    this._name = name
  }

  get id(): string { return this._id }

  get name(): string { return this._name }

  get productId(): string { return this._productId }

  get quantity(): number { return this._quantity }

  get price(): number { return this._price }

  get total(): number { return this._quantity * this._price }
}