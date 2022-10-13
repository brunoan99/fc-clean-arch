import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factories/product-factory";
import { ProductModel } from "../../../infraestructure/product/repository/sequelize/product";
import { ProductRepository } from "../../../infraestructure/product/repository/sequelize/product-repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Find Product Use Case", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  test('Should find a product', async () => {
    const productRepo = new ProductRepository()
    const sut = new FindProductUseCase(productRepo);
    const product = ProductFactory.creatProductA("Product1", 1)
    await productRepo.create(product)
    const input = {
      id: product.id
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
    const customerRepository = new ProductRepository()
    const sut = new FindProductUseCase(customerRepository);
    const input = {
      id: "123"
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Product not found")
  })
})