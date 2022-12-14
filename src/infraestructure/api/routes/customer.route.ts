import express, { request, Request, Response } from "express"
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase"
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase"
import { CustomerRepository } from "../../db/customer/repository/sequelize/customer-repository"
import { CustomerPresenter } from "../presenters/customer.presenter"

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      }
    }
    const output = await usecase.execute(customerDto)
    return res.status(200).json(output)
  } catch (err) {
    return res.status(500).json(err)
  }
})

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())
  try {
    const customerDto = {}
    const output = await usecase.execute(customerDto)
    return res.format({
      json: () => res.status(200).send(output),
      xml: () => res.status(200).send(CustomerPresenter.listToXML(output))
    })
  } catch (err) {
    return res.status(500).json(err)
  }
})