import { app, sequelize } from "../express"
import request from "supertest"

describe("Customer E2E", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test("should create a product", async () => {
    await request(app)
      .post("/product")
      .send({
        name: "Product Name",
        price: 1
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe("Product Name")
        expect(res.body.price).toBe(1)
      })
      .catch(err => {
        expect(err).toBeUndefined()
     })
  })

  test("Should not create a product", async () => {
    await request(app)
      .post("/product")
      .send({
        price: 1
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .catch(err => {
        expect(err).toBeDefined()
      })
  })

  test("Should list all products", async () => {
    await request(app)
      .post("/product")
      .send({
        name: "Product Name1",
        price: 1
      })
      .expect(200)
    await request(app)
    .post("/product")
    .send({
      name: "Product Name2",
      price: 2
    })
    .expect(200)
    await request(app)
      .get("/product")
      .send()
      .expect(200)
      .then(res => {
        expect(res.body.products.length).toBe(2)
        expect(res.body.products[0].name).toBe("Product Name1")
        expect(res.body.products[1].name).toBe("Product Name2")
      })
  })
})