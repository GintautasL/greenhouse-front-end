import React from "react"
import { mount } from "enzyme"
import { Register } from "./Register"

describe("<Register />", () => {
  it("renders component without crashing", () => {
    mount(<Register />)
  })
})
