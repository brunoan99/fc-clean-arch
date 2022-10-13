import { Order } from "../../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../../domain/checkout/entity/order_item";
import { OrderRepositoryInterface } from "../../../../../domain/checkout/repository/order-repository-interface";
import { OrderModel } from "./order";
import { OrderItemModel } from "./order-item";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: entity.id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error(`Order not found with id: ${entity.id}`)
    }
    // compare OrderModel and entity
    for (const item of orderModel.items) {
      if (!entity.items.some(i => i.id === item.id)) {
        OrderItemModel.destroy({ where: { id: item.id}})
      }
    }
    for (const item of entity.items) {
      if (!orderModel.items.some(i => i.id === item.id)) {
        OrderItemModel.create({
          id: item.id,
          product_id: item.productId,
          order_id: orderModel.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })
      } else {
        OrderItemModel.update({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }, { where: { id: item.id }})
      }
    }
    await OrderModel.update({
      total: entity.total()
    },{
      where: { id: entity.id}
    })
  }

  async findById(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error(`Order not found with id: ${id}`)
    }
    const orderItems: OrderItem[] = []
    for (const orderItem of orderModel.items) {
      orderItems.push(new OrderItem(orderItem.id, orderItem.product_id, orderItem.name, orderItem.price, orderItem.quantity))
    }
    const order = new Order(orderModel.id, orderModel.customer_id, orderItems)
    return order
  }
  
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });
    return orderModels.map((order) => {
      const orderItems = order.items.map((item) => {
        return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)
      })
      return new Order(order.id, order.customer_id, orderItems)
    })
  }
}