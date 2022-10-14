import { Notification } from "./notification"

describe('Notification', () => {
  it('Should create errors', () => {
    const sut = new Notification()
    const error1 = {
      message: "first error message",
      context: "customer"
    }
    sut.addError(error1)
    expect(sut.messages("customer")).toBe(`${error1.context}: ${error1.message}`)
    const error2 = {
      message: "second error message",
      context: "customer"
    }
    sut.addError(error2)
    expect(sut.messages("customer")).toBe(`${error1.context}: ${error1.message},${error2.context}: ${error2.message}`)
    const error3 = {
      message: "third error message",
      context: "another"
    }
    sut.addError(error3)
    expect(sut.messages()).toBe(`${error1.context}: ${error1.message},${error2.context}: ${error2.message},${error3.context}: ${error3.message}`)
  })

  it("shoudl check if notification has at least one error", () => {
    const sut = new Notification()
    const error1 = {
      message: "first error message",
      context: "customer"
    }
    sut.addError(error1)
    expect(sut.hasError()).toBe(true)
  })

  it("shoudl get all errors props", () => {
    const sut = new Notification()
    const error1 = {
      message: "first error message",
      context: "customer"
    }
    const error2 = {
      message: "second error message",
      context: "customer"
    }
    const error3 = {
      message: "third error message",
      context: "another"
    }
    sut.addError(error1)
    sut.addError(error2)
    sut.addError(error3)
    expect(sut.errors).toEqual([
      error1,
      error2,
      error3
    ])
  })
})