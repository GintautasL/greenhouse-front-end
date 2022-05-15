import React from "react"
import { mount } from "enzyme"
import { Login } from "./Login"

describe("<Login />", () => {
  it("renders component without crashing", () => {
    mount(<Login />)
  })
})
