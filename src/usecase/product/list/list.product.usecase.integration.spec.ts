import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../domain/product/entity/product"
import { ProductFactory } from "../../../domain/product/factories/product-factory"
import { ProductModel } from "../../../infraestructure/product/repository/sequelize/product"
import { ProductRepository } from "../../../infraestructure/product/repository/sequelize/product-repository"
import { ListProductUseCase } from "./list.product.usecase"

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
  
  test('Should list products', async () => {
    const productRepo = new ProductRepository()
    const sut = new ListProductUseCase(productRepo)
    const product1 = ProductFactory.creatProductA("Product1", 1)
    await productRepo.create(product1)
    const product2 = ProductFactory.creatProductA("Product2", 2)
    await productRepo.create(product2)
    const input = {}
    const output = await sut.execute(input)
    const expectedOutput = {
      products: [
        {
          id: expect.any(String),
          name: "Product1",
          price: 1
        },
        {
          id: expect.any(String),
          name: "Product2",
          price: 2
        }
      ]
    }
    expect(output).toEqual(expectedOutput)
  })
})