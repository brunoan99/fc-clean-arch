import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factories/product-factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { ListProductUseCase } from "./list.product.usecase";

class ProductRepositoryStub implements ProductRepositoryInterface {
  create(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Product): Promise<void> { throw new Error("Method not implemented."); }
  findById(id: string): Promise<Product> { throw new Error("Method not implemented."); }
  findAll(): Promise<Product[]> { throw new Error("Method not implemented."); }
}

describe('List Product Use Case', () => {
  test('Should list products', async () => {
    const productRepo = new ProductRepositoryStub()
    const sut = new ListProductUseCase(productRepo)
    const product1 = new Product("123", "Product1", 1)
    const product2 = new Product("321", "Product2", 2)
    jest.spyOn(productRepo, "findAll").mockReturnValueOnce(new Promise(resolve => resolve([product1, product2])))
    const input = {}
    const output = await sut.execute(input)
    const expectedOutput = {
      products: [
        {
          id: "123",
          name: "Product1",
          price: 1
        },
        {
          id: "321",
          name: "Product2",
          price: 2
        }
      ]
    }
    expect(output).toEqual(expectedOutput)
  })
})