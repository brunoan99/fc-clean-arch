import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

class CustomerRepositoryStub implements CustomerRepositoryInterface {
  create(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Customer> { throw new Error("Method not implemented."); }
  findAll(): Promise<Customer[]> { throw new Error("Method not implemented."); }
}

describe("Find Customer Use Case", () => {
  test('Should find a customer', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new FindCustomerUseCase(customerRepository);
    const customer = new Customer("123", "Name")
    const address = new Address("Street", 123, "Zip", "City")
    customer.changeAddress(address)
    jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(new Promise(resolve => resolve(customer)))
    const input = {
      id: "123"
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: "123", 
      name: "Name", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    expect(output).toEqual(expectedOutput)
  })

  test('Should not find a customer', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new FindCustomerUseCase(customerRepository);
    jest.spyOn(customerRepository, 'findById').mockImplementationOnce(() => { throw new Error("Customer not found") })
    const input = {
      id: "123"
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Customer not found")
  })
})