import React from "react"
import { mount } from "enzyme"
import { Microcontroller } from "./Microcontroller"

describe("<Microcontroller />", () => {
  it("renders component without crashing", () => {
    mount(<Microcontroller />)
  })
})
