import React from "react"
import { mount } from "enzyme"
import { Header } from "./Header"

describe("<Header />", () => {
  it("renders component without crashing", () => {
    mount(<Header />)
  })
})
