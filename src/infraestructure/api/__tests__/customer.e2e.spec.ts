import { app, sequelize } from '../express'
import request from 'supertest'

describe("Customer E2E", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test("should create a customer", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "Full Name",
        address: {
          street: "Street",
          number: 1,
          city: "City",
          zip: "Zip",
        },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe("Full Name")
        expect(res.body.address.street).toBe("Street")
        expect(res.body.address.number).toBe(1)
        expect(res.body.address.city).toBe("City")
        expect(res.body.address.zip).toBe("Zip")
      })
      .catch(err => {
        expect(err).toBeUndefined()
     })
  })

  test("Should not create a customer", async () => {
    await request(app)
      .post("/customer")
      .send({
        address: {
          street: "Street",
          number: 1,
          city: "City",
          zip: "Zip",
        },
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .catch(err => {
        expect(err).toBeDefined()
      })
  })

  test("Should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "Full Name1",
        address: {
          street: "Street1",
          number: 1,
          city: "City1",
          zip: "Zip1",
        },
      })
      .expect(200)
    await request(app)
      .post("/customer")
      .send({
        name: "Full Name2",
        address: {
          street: "Street2",
          number: 2,
          city: "City2",
          zip: "Zip2",
        },
      })
      .expect(200)
    await request(app)
      .get("/customer")
      .send()
      .expect(200)
      .then(res => {
        expect(res.body.customers.length).toBe(2)
        expect(res.body.customers[0].name).toBe("Full Name1")
        expect(res.body.customers[1].name).toBe("Full Name2")
      })
  })

  test("Should list all customer in XML", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "Full Name1",
        address: {
          street: "Street1",
          number: 1,
          city: "City1",
          zip: "Zip1",
        },
      })
      .expect(200)
    await request(app)
      .post("/customer")
      .send({
        name: "Full Name2",
        address: {
          street: "Street2",
          number: 2,
          city: "City2",
          zip: "Zip2",
        },
      })
      .expect(200)
    await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send()
      .expect(200)
      .then(res => {
        expect(res.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
      })

  })
})