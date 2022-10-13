import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factories/product-factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { FindProductUseCase } from "./find.product.usecase";

class ProductRepositoryStub implements ProductRepositoryInterface {
  create(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Product> { throw new Error("Method not implemented."); }
  findAll(): Promise<Product[]> { throw new Error("Method not implemented."); }
}

describe("Find Product Use Case", () => {
  test('Should find a product', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new FindProductUseCase(productRepo);
    const product = ProductFactory.creatProductA("Product1", 1)
    jest.spyOn(productRepo, 'findById').mockReturnValueOnce(new Promise(resolve => resolve(product)))
    const input = {
      id: "any_id"
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: expect.any(String), 
      name: "Product1", 
      price: 1
    }
    expect(output).toEqual(expectedOutput)
  })

  test('Should not find a customer', async () => {
    const customerRepository = new ProductRepositoryStub()
    const sut = new FindProductUseCase(customerRepository);
    jest.spyOn(customerRepository, 'findById').mockImplementationOnce(() => { throw new Error("Product not found") })
    const input = {
      id: "123"
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Product not found")
  })
})