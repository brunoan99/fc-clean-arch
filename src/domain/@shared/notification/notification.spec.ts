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
})