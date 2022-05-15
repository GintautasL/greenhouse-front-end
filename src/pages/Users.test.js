import React from "react"
import { mount } from "enzyme"
import { Users } from "./Users"

describe("<Users />", () => {
  it("renders component without crashing", () => {
    mount(<Users />)
  })
})
