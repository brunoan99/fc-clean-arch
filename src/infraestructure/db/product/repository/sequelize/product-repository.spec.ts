import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../../../domain/product/entity/product"
import { ProductModel } from "./product"
import { ProductRepository } from "./product-repository"

describe('Product Repository', () => {
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

  test('Should create a product', async () => {
    const sut = new ProductRepository()
    const product = new Product("1", "Product1", 10)

    await sut.create(product)
    const productModel = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel.toJSON()).toEqual({
      id: "1",
      name: "Product1",
      price: 10
    })
  })

  test('Should update a product', async () => {
    const sut = new ProductRepository()
    const product = new Product("1", "Product1", 10)

    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    })
    const productModel1 = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel1.toJSON()).toEqual({
      id: "1",
      name: "Product1",
      price: 10
    })

    product.changeName("Product2")
    product.changePrice(20)

    await sut.update(product)
    const productModel2 = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel2.toJSON()).toEqual({
      id: "1",
      name: "Product2",
      price: 20
    })
  })

  test('Should find a product', async () => {
    const sut = new ProductRepository()
    const product = new Product("1", "Product1", 10)

    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    })
    const foundProduct = await sut.findById(product.id)
    expect(foundProduct).toEqual(product)
  })

  test('Should findAll a product', async () => {
    const sut = new ProductRepository()
    const product1 = new Product("1", "Product1", 10)
    const product2 = new Product("2", "Product2", 20)
    const product3 = new Product("3", "Product3", 30)
    const products = [product1, product2, product3]
    for (const product of products) {
      await ProductModel.create({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    }
    const foundProducts = await sut.findAll()
    expect(foundProducts).toEqual(products)
  })
})