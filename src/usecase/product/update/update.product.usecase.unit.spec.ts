import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factories/product-factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { UpdateProductUseCase } from "./update.product.usecase";

class ProductRepositoryStub implements ProductRepositoryInterface {
  create(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Product> { throw new Error("Method not implemented."); }
  findAll(): Promise<Product[]> { throw new Error("Method not implemented."); }
}

describe("Update Product Use Case", () => {
  test('Should update a product', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new UpdateProductUseCase(productRepo)
    const product = ProductFactory.creatProductA("Product1", 1)
    jest.spyOn(productRepo, "findById").mockReturnValueOnce(new Promise(resolve => resolve(product)))
    jest.spyOn(productRepo, "update").mockImplementationOnce(async () => { return })
    const input = {
      id: "any_id",
      name: "Name Da Silva",
      price: 10
    }
    const output = await sut.execute(input)
    const expectedOutput = {
      id: product.id,
      name: "Name Da Silva",
      price: 10
    }
    expect(output).toEqual(expectedOutput)
  })

  test('Should throw an error when customer with provided id is not found', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new UpdateProductUseCase(productRepo)
    jest.spyOn(productRepo, 'findById').mockImplementationOnce(() => { throw new Error("Product not found") })
    jest.spyOn(productRepo, "update").mockImplementationOnce(async () => { return })
    const input = {
      id: "any_id",
      name: "Name Da Silva",
      price: 10
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Product not found")
  })

  test('Should throw an error when customer name is missing or invalid', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new UpdateProductUseCase(productRepo)
    const product = ProductFactory.creatProductA("Product1", 1)
    jest.spyOn(productRepo, "findById").mockReturnValue(new Promise(resolve => resolve(product)))
    jest.spyOn(productRepo, "update").mockImplementation(async () => { return })
    const input = {
      id: "any_id",
      name: "",
      price: 10
    }
    let output = sut.execute(input)
    await expect(output).rejects.toThrow("Name is required")
  })
})