import { Sequelize } from "sequelize-typescript";
import { ProductFactory } from "../../../domain/product/factories/product-factory";
import { ProductModel } from "../../../infraestructure/db/product/repository/sequelize/product";
import { ProductRepository } from "../../../infraestructure/db/product/repository/sequelize/product-repository";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Update Product Use Case", () => {
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
  test('Should update a product', async () => {
    const productRepo = new ProductRepository()
    const sut = new UpdateProductUseCase(productRepo)
    const product = ProductFactory.creatProductA("Product1", 1)
    await productRepo.create(product)
    const input = {
      id: product.id,
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
    const productRepo = new ProductRepository()
    const sut = new UpdateProductUseCase(productRepo)
    const input = {
      id: "any_id",
      name: "Name Da Silva",
      price: 10
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("Product not found")
  })

  test('Should throw an error when customer name is missing or invalid', async () => {
    const productRepo = new ProductRepository()
    const sut = new UpdateProductUseCase(productRepo)
    const product = ProductFactory.creatProductA("Product1", 1)
    await productRepo.create(product)
    const input = {
      id: product.id,
      name: "",
      price: 10
    }
    let output = sut.execute(input)
    await expect(output).rejects.toThrow("product: Name is mandatory")
  })
})