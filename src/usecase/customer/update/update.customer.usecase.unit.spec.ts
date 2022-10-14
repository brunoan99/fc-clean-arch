import { NotificationError } from "../../../domain/@shared/notification/notification.error";
import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

class CustomerRepositoryStub implements CustomerRepositoryInterface {
  create(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Customer> { throw new Error("Method not implemented."); }
  findAll(): Promise<Customer[]> { throw new Error("Method not implemented."); }
}

describe("Update Customer Use Case", () => {
  test('Should update a customer', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new UpdateCustomerUseCase(customerRepository);
    const customer = new Customer("123", "Name")
    const address = new Address("Street", 1, "Zip", "City")
    customer.changeAddress(address)
    jest.spyOn(customerRepository, "findById").mockReturnValueOnce(new Promise(resolve => resolve(customer)))
    jest.spyOn(customerRepository, "update").mockImplementationOnce(async () => { return })
    const input = {
      id: "123",
      name: "Name Da Silva", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: "123",
      name: input.name, 
      address: input.address
    }
    expect(output).toEqual(expectedOutput)
  })

  test('Should throw an error when customer with provided id is not found', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new UpdateCustomerUseCase(customerRepository);
    jest.spyOn(customerRepository, 'findById').mockImplementationOnce(() => { throw new Error("Customer not found") })
    jest.spyOn(customerRepository, "update").mockImplementationOnce(async () => { return })
    const input = {
      id: "123",
      name: "Name Da Silva", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Customer not found")
  })

  test('Should throw an error when customer name is missing or invalid', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new UpdateCustomerUseCase(customerRepository);
    const customer = new Customer("123", "Name da Silva ")
    const address = new Address("Street", 1, "Zip", "City")
    customer.changeAddress(address)
    jest.spyOn(customerRepository, "findById").mockReturnValue(new Promise(resolve => resolve(customer)))
    jest.spyOn(customerRepository, "update").mockImplementation(async () => { return })
    let input = {
      id: "123",
      name: "Name", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    let output = sut.execute(input)
    await expect(output).rejects.toThrowError(new NotificationError([{
      context: "customer",
      message: "Invalid name, names must contain at least first and last name"
    }]))
    input = {
      id: "123",
      name: "", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    output = sut.execute(input)
    await expect(output).rejects.toThrowError(new NotificationError([{
      context: "customer",
      message: "Invalid name, names must contain at least first and last name"
    }]))
  })
})