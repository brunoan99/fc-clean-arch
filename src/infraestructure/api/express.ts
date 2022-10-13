import express, { Express }  from "express"
import { Sequelize } from "sequelize-typescript"
import { CustomerModel } from "../db/customer/repository/sequelize/customer"
import { ProductModel } from "../db/product/repository/sequelize/product"
import { customerRoute } from "./routes/customer.route"
import { productRoute } from "./routes/product.route"

export const app: Express = express()
app.use(express.json())
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

setupDb()