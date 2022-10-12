import { Order } from "../entity/order";
import { v4 as uuid } from "uuid";
import { OrderItem } from "../entity/order_item";

export interface OrderFactoryProps {
  id?: string;
  customerId: string;
  items: {
    id?: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const id = orderProps.id || uuid()
    const orderItems = orderProps.items.map(item => {
      const id = item.id || uuid()
      return new OrderItem(
        id,
        item.productId,
        item.name,
        item.price,
        item.quantity
        )
      })
    const order = new Order(id, orderProps.customerId, orderItems)
    return order
  }
}