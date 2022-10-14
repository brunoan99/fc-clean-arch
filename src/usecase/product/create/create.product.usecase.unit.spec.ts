import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { CreateProductUseCase } from "./create.product.usecase";


class ProductRepositoryStub implements ProductRepositoryInterface {
  create(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Product> { throw new Error("Method not implemented."); }
  findAll(): Promise<Product[]> { throw new Error("Method not implemented."); }
}

describe('Create Product Use Case', () => {
  test('Should create product', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new CreateProductUseCase(productRepo)
    jest.spyOn(productRepo, "create").mockImplementationOnce(async () => { return })
    const input = {
      name: "Product1",
      price: 1
    }
    const expectedOutput = {
      id: expect.any(String),
      name: "Product1",
      price: 1
    }
    const output = await sut.execute(input)
    expect(output).toEqual(expectedOutput)
  })

  test('Should throw an error when name is missing', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new CreateProductUseCase(productRepo)
    const input = {
      name: "",
      price: 1
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("product: Name is mandatory")
  })

  test('Should throw an error when price is missing', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new CreateProductUseCase(productRepo)
    const input = {
      name: "Product1",
      price: -1
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("product: Price is mandatory")
  })
})
