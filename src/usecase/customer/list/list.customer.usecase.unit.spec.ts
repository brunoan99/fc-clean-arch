import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerFactory } from "../../../domain/customer/factories/customer-factory";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

class CustomerRepositoryStub implements CustomerRepositoryInterface {
  create(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Customer> { throw new Error("Method not implemented."); }
  findAll(): Promise<Customer[]> { throw new Error("Method not implemented."); }
}

describe("List Customer Use Case", () => {
  test('Should list customer', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new ListCustomerUseCase(customerRepository);
    const customer1 = CustomerFactory.createWithAddress("Joao", new Address("Street1", 1, "Zip1", "City1"))
    const customer2 = CustomerFactory.createWithAddress("Maria", new Address("Street2", 2, "Zip2", "City2"))
    jest.spyOn(customerRepository, "findAll").mockReturnValueOnce(new Promise(resolve => resolve([ customer1, customer2])))
    const input = {}
    const output = await sut.execute(input)
    const expectedOutput = {
      customers: [
        {
          id: expect.any(String),
          name: customer1.name, 
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            zip: customer1.address.zip
          }
        },
        {
          id: expect.any(String),
          name: customer2.name, 
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            zip: customer2.address.zip
          }

        }
      ]
    }
    expect(output).toEqual(expectedOutput)
  })
})