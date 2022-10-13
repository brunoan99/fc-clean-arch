import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../infraestructure/db/customer/repository/sequelize/customer";
import { CustomerRepository } from "../../../infraestructure/db/customer/repository/sequelize/customer-repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Find Customer Use Case", () => {
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

  test('Should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository);
    const customer = new Customer("123", "John")
    const address = new Address("Rua 1", 1, "123", "city")
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const input = {
      id: "123"
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: "123", 
      name: "John", 
      address: {
        street: "Rua 1",
        number: 1, 
        zip: "123",
        city: "city",
      }
    }
    expect(output).toEqual(expectedOutput)
  })
})