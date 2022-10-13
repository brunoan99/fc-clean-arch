import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../../../domain/customer/value-object/address";
import { Customer } from "../../../../../domain/customer/entity/customer";
import { CustomerModel } from "./customer";
import { CustomerRepository } from "./customer-repository";

describe("Customer repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a customer", async () => {
    const sut = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await sut.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  test("should update a customer", async () => {
    const sut = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await sut.create(customer);

    customer.changeName("Customer 2");
    await sut.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  test("should find a customer", async () => {
    const sut = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address)
    await sut.create(customer);

    const customerResult = await sut.findById(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  test("should throw an error when customer is not found", async () => {
    const sut = new CustomerRepository();

    expect(async () => {
      await sut.findById("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  test("should find all customers", async () => {
    const sut = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1)
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2)
    customer2.addRewardPoints(20);

    await sut.create(customer1);
    await sut.create(customer2);

    const customers = await sut.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});