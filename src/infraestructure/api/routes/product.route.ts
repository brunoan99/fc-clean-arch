import express, { Request, Response } from "express"
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase"
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase"
import { ProductRepository } from "../../db/product/repository/sequelize/product-repository"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  try {
    const customerDto = {
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(customerDto)
    return res.status(200).json(output)
  } catch (err) {
    return res.status(500).json(err)
  }
})

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())
  try {
    const productDto = {}
    const output = await usecase.execute(productDto)
    return res.status(200).json(output)
  } catch (err) {
    return res.status(500).json(err)
  }
})