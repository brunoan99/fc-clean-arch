import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../infraestructure/db/product/repository/sequelize/product"
import { ProductRepository } from "../../../infraestructure/db/product/repository/sequelize/product-repository"
import { CreateProductUseCase } from "./create.product.usecase"

describe('List Product Use Case', () => {
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
  
  test('Should create product', async () => {
    const productRepo = new ProductRepository()
    const sut = new CreateProductUseCase(productRepo)
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
    const productinRepo = await productRepo.findById(output.id)
    expect(productinRepo).toBeDefined()
    expect(productinRepo.name).toEqual(input.name)
    expect(productinRepo.price).toEqual(input.price)
  })

  test('Should throw an error when name is missing', async () => {
    const productRepo = new ProductRepository()
    const sut = new CreateProductUseCase(productRepo)
    const input = {
      name: "",
      price: 1
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("product: Name is mandatory")
  })

  test('Should throw an error when price is missing', async () => {
    const productRepo = new ProductRepository()
    const sut = new CreateProductUseCase(productRepo)
    const input = {
      name: "Product1",
      price: -1
    }
    const output = sut.execute(input)
    await expect(output).rejects.toThrow("product: Price is mandatory")
  })
})