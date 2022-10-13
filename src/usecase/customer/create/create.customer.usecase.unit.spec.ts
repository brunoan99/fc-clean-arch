import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { CreateCustomerUseCase } from "./create.customer.usecase";

class CustomerRepositoryStub implements CustomerRepositoryInterface {
  create(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Customer): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Customer> { throw new Error("Method not implemented."); }
  findAll(): Promise<Customer[]> { throw new Error("Method not implemented."); }
}

describe("Create Customer Use Case", () => {
  test('Should create a customer', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new CreateCustomerUseCase(customerRepository);
    jest.spyOn(customerRepository, "create").mockImplementationOnce(async () => { return })
    const input = {
      name: "Name", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: expect.any(String),
      name: input.name, 
      address: input.address
    }
    expect(output).toEqual(expectedOutput)
  })

  test('Should throw an error when name is missing', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new CreateCustomerUseCase(customerRepository);
    jest.spyOn(customerRepository, "create").mockImplementationOnce(async () => { return })
    const input = {
      name: "", 
      address: {
        street: "Street",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Name is required")
  })

  test('Should throw an error when street is missing', async () => {
    const customerRepository = new CustomerRepositoryStub()
    const sut = new CreateCustomerUseCase(customerRepository);
    jest.spyOn(customerRepository, "create").mockImplementationOnce(async () => { return })
    const input = {
      name: "Name", 
      address: {
        street: "",
        number: 123, 
        city: "City",
        zip: "Zip",
      }
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Street is required")
  })
})