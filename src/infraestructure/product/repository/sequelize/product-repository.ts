import { Product } from "../../../../domain/product/entity/product"
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository-interface"
import { ProductModel } from "./product"

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
    {
      name: entity.name,
      price: entity.price,
    },
    { 
      where: { 
        id: entity.id
      }
    }
    )
  }
  async findById(id: string): Promise<Product> {
    try {
      const product = await ProductModel.findByPk(id)
      return new Product(product.id, product.name, product.price)
    } catch (error) {
      throw new Error("Product not found")
    }
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map((productModel) => new Product(productModel.id, productModel.name, productModel.price))
  }
}