import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer";
import { OrderItemModel } from "./order-item";
import { ProductModel } from "../../../product/repository/sequelize/product";
import { OrderRepository } from "./order-repository";
import { OrderModel } from "./order";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer-repository";
import { ProductRepository } from "../../../product/repository/sequelize/product-repository";

const createNewCustomer = async (id: string): Promise<Customer> => {
  const customer = new Customer(id, `Customer ${id}`);
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address);
  await CustomerModel.create({
    id: customer.id,
    name: customer.name,
    street: customer.address.street,
    number: customer.address.number,
    zipcode: customer.address.zip,
    city: customer.address.city,
    active: customer.isActive(),
    rewardPoints: customer.rewardPoints,
  });
  return customer
}

const createNewOrderItem = async (id: string, price: number, quantity: number): Promise<OrderItem> => {
  const product = new Product(`ABC${id}`, `Product ${id}`, price);
  await ProductModel.create({
    id: product.id,
    name: product.name,
    price: product.price,
  })
  const orderItem = new OrderItem(
    id,
    product.id,
    product.name,
    product.price,
    quantity
  );
  return orderItem
}

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  test('Should findAll method return a empty list if no order was before provided to repository', async () => {
    const sut = new OrderRepository()
    const orderModels = await sut.findAll()
    expect(orderModels).toEqual([])
  })

  test('Should findAll method return a list with all orders provided to repository', async () => {
    const sut = new OrderRepository()
    const customer = await createNewCustomer("1")
    const orderItem1 = await createNewOrderItem("1", 10, 1)
    const orderItem2 = await createNewOrderItem("3", 30, 3)
    const orderItem3 = await createNewOrderItem("2", 20, 3)
    const order1 = new Order("1", customer.id, [orderItem1])
    const order2 = new Order("2", customer.id, [orderItem2])
    const order3 = new Order("3", customer.id, [orderItem3])
    const orders = [ order1, order2, order3 ]
    for (const order of orders ) {
      await sut.create(order)
    }
    const foundOrders = await sut.findAll()
    expect(foundOrders).toEqual(orders)
  })

  test('Should findById method throw if no order was before provided to repository', async () => {
    const sut = new OrderRepository()
    expect(async () => {
      await sut.findById('any_invalid_id')
    }).rejects.toThrowError("Order not found with id: any_invalid_id")
  })

  test('Should findById method return registered order', async () => {
    const sut = new OrderRepository()
    const customer = await createNewCustomer("1")
    const orderItem = await createNewOrderItem("1", 10, 1)
    const order = new Order("1", customer.id, [orderItem])
    await sut.create(order)
    const foundOrder = await sut.findById(order.id)
    expect(foundOrder).toEqual(order)
  })

  test('Should update method return a error if the order is not found', async () => {
    const sut = new OrderRepository()
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    const product = new Product("123", "Product 1", 10);
    const ordemItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("any_invalid_id", "123", [ordemItem]);
    expect(async () => {
      await sut.update(order)
    }).rejects.toThrowError("Order not found with id: any_invalid_id")
  })

  test('Should update method update a order adding a item', async () => {
    const sut = new OrderRepository()
    const customer = await createNewCustomer("1")
    const orderItem1 = await createNewOrderItem("1", 10, 1)
    const order = new Order("1", customer.id, [orderItem1])
    await sut.create(order)

    const orderItem2 = await createNewOrderItem("2", 10, 2)
    order.changeItems([orderItem1, orderItem2])

    await sut.update(order)
    const orderModel = await OrderModel.findByPk(order.id, { include: [{ model: OrderItemModel }]})
    expect(orderModel.toJSON()).toEqual({
      customer_id: order.customerId,
      id: order.id,
      items: [{
        id: order.items[0].id,
        name: order.items[0].name,
        price: order.items[0].price,
        order_id: order.id,
        product_id: order.items[0].productId,
        quantity: order.items[0].quantity
      },
      {
        id: order.items[1].id,
        name: order.items[1].name,
        price: order.items[1].price,
        order_id: order.id,
        product_id: order.items[1].productId,
        quantity: order.items[1].quantity
      }],
      total: order.total()
    })
  })

  test('Should update method update a order removing a item', async () => {
    const sut = new OrderRepository()
    const customer = await createNewCustomer("1")
    const orderItem1 = await createNewOrderItem("1", 10, 1)
    const orderItem2 = await createNewOrderItem("2", 10, 2)
    const order = new Order("1", customer.id, [orderItem1, orderItem2])
    await sut.create(order)

    order.changeItems([orderItem1])

    await sut.update(order)
    const orderModel = await OrderModel.findByPk(order.id, { include: [{ model: OrderItemModel }]})
    expect(orderModel.toJSON()).toEqual({
      customer_id: order.customerId,
      id: order.id,
      items: [{
        id: order.items[0].id,
        name: order.items[0].name,
        price: order.items[0].price,
        order_id: order.id,
        product_id: order.items[0].productId,
        quantity: order.items[0].quantity
      }],
      total: order.total()
    })
  })

  test('Should update method update a order and it order items', async () => {
    const sut = new OrderRepository()
    const customer = await createNewCustomer("1")
    const orderItem1 = await createNewOrderItem("1", 10, 1)
    const order = new Order("1", customer.id, [orderItem1])
    await sut.create(order)
    orderItem1.updatePrice(15)
    orderItem1.updateQuantity(2)
    orderItem1.updateName("New Name")
    order.changeItems([orderItem1])

    await sut.update(order)
    const orderModel = await OrderModel.findByPk(order.id, { include: [{ model: OrderItemModel }]})
    expect(orderModel.toJSON()).toEqual({
      customer_id: order.customerId,
      id: order.id,
      items: [{
        id: order.items[0].id,
        name: order.items[0].name,
        price: order.items[0].price,
        order_id: order.id,
        product_id: order.items[0].productId,
        quantity: order.items[0].quantity
      }],
      total: order.total()
    })
  })
});