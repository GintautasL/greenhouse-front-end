import React from "react"
import { mount } from "enzyme"
import SimpleBackdrop from "./BackDrop"

describe("<SimpleBackdrop />", () => {
  it("renders component without crashing", () => {
    mount(<SimpleBackdrop />)
  })
})
