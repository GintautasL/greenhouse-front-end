import React from "react"
import { mount, shallow } from "enzyme"
import { GreenhouseControlComponent } from "./GreenhouseControl"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "../test_utils/theme"

import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import delay from "delay"

// This sets the mock adapter on the default instance

describe("<GreenhouseControlComponent />", () => {
  it("renders component without crashing", () => {
    mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
  })

  it("display nera vandens if water level is 0", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(waterChipText.text()).toEqual("Nėra vandens")
  })

  it("display beveik nera vandens if water level is 1", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 1,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(waterChipText.text()).toEqual("Beveik nėra vandens")
  })

  it("display vandens yra if water level is 2", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 2,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(waterChipText.text()).toEqual("Vandens yra")
  })

  it("display red chip color if water level is 0", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(
      waterChipText.get(0).props.children[1].props.ownerState
    ).toHaveProperty("color", "error")
  })

  it("display orange chip color if water level is 1", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 1,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(
      waterChipText.get(0).props.children[1].props.ownerState
    ).toHaveProperty("color", "warning")
  })

  it("display green chip color if water level is 2", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 1,
            water_level: 2,
            is_active: 1,
          }}
        />
      </ThemeProvider>
    )
    const waterChipText = wrapper
      .find('[data-testid="water-level"]')
      .hostNodes()

    expect(
      waterChipText.get(0).props.children[1].props.ownerState
    ).toHaveProperty("color", "success")
  })

  it("renders selected temperature auto button", async () => {
    const mock = new MockAdapter(axios)
    mock.onPut("/user/greenhouseControl/temperatureAuto", {}).reply(200)
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 1,
            water_level: 2,
            is_active: 1,
          }}
        ></GreenhouseControlComponent>
      </ThemeProvider>
    )
    const temperatureButton = wrapper
      .find('[data-testid="temperature-auto"]')
      .hostNodes()
    expect(temperatureButton.text()).toEqual("Įjungta")
    temperatureButton.simulate("click")
    await delay(4000)
    expect(temperatureButton.text()).toEqual("Išjungta")
    mock.reset()
  })

  it("renders selected humidity auto button", async () => {
    const mock = new MockAdapter(axios)
    mock.onPut("/user/greenhouseControl/humidityAuto", {}).reply(200)
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 1,
            water_level: 2,
            is_active: 1,
          }}
        ></GreenhouseControlComponent>
      </ThemeProvider>
    )
    const humidityButton = wrapper
      .find('[data-testid="humidity-auto"]')
      .hostNodes()
    expect(humidityButton.text()).toEqual("Įjungta")
    humidityButton.simulate("click")
    await delay(4000)
    expect(humidityButton.text()).toEqual("Išjungta")
    mock.reset()
  })

  it("renders selected fans button", async () => {
    const mock = new MockAdapter(axios)
    mock.onPut("/user/greenhouseControl/fans", {}).reply(200)
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 1,
            water_level: 2,
            is_active: 1,
          }}
        ></GreenhouseControlComponent>
      </ThemeProvider>
    )
    const fansButton = wrapper.find('[data-testid="manual-fans"]').hostNodes()
    expect(fansButton.text()).toEqual("Įjungta")
    fansButton.simulate("click")
    await delay(4000)
    expect(fansButton.text()).toEqual("Išjungta")
    mock.reset()
  })

  it("renders selected light button", async () => {
    const mock = new MockAdapter(axios)
    mock.onPut("/user/greenhouseControl/light", {}).reply(200)
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 1,
            water_level: 2,
            is_active: 1,
          }}
        ></GreenhouseControlComponent>
      </ThemeProvider>
    )
    const lightButton = wrapper.find('[data-testid="manual-light"]').hostNodes()
    expect(lightButton.text()).toEqual("Įjungta")
    lightButton.simulate("click")
    await delay(4000)
    expect(lightButton.text()).toEqual("Išjungta")
    mock.reset()
  })

  it("renders selected water button", async () => {
    const mock = new MockAdapter(axios)
    mock.onPut("/user/greenhouseControl/water", {}).reply(200)
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 1,
            manual_water: 0,
            water_level: 2,
            is_active: 1,
          }}
        ></GreenhouseControlComponent>
      </ThemeProvider>
    )
    const lightButton = wrapper.find('[data-testid="manual-water"]').hostNodes()
    expect(lightButton.text()).toEqual("Palaistyti")
    lightButton.simulate("click")
    await delay(4000)
    expect(lightButton.text()).toEqual("Laistoma")

    mock.reset()
  })

  it("display isjungta temperature auto", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper
      .find('[data-testid="temperature-auto"]')
      .hostNodes()

    expect(buttonText.text()).toEqual("Išjungta")
  })

  it("display ijungta temperature auto", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper
      .find('[data-testid="temperature-auto"]')
      .hostNodes()

    expect(buttonText.text()).toEqual("Įjungta")
  })

  it("display isjungta humidity auto", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="humidity-auto"]').hostNodes()

    expect(buttonText.text()).toEqual("Išjungta")
  })

  it("display ijungta humidity auto", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="humidity-auto"]').hostNodes()

    expect(buttonText.text()).toEqual("Įjungta")
  })

  it("display isjungta manual fans", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-fans"]').hostNodes()

    expect(buttonText.text()).toEqual("Išjungta")
  })

  it("display ijungta manual fans", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 1,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-fans"]').hostNodes()

    expect(buttonText.text()).toEqual("Įjungta")
  })

  it("display isjungta manual light", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-light"]').hostNodes()

    expect(buttonText.text()).toEqual("Išjungta")
  })

  it("display ijungta manual light", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 1,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-light"]').hostNodes()

    expect(buttonText.text()).toEqual("Įjungta")
  })

  it("display isjungta manual water", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-water"]').hostNodes()

    expect(buttonText.text()).toEqual("Palaistyti")
  })

  it("display ijungta manual water", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 1,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const buttonText = wrapper.find('[data-testid="manual-water"]').hostNodes()

    expect(buttonText.text()).toEqual("Laistoma")
  })

  it("display isjungta microcontroller", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 0,
            is_humidity_auto: 0,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 0,
          }}
        />
      </ThemeProvider>
    )
    const chipText = wrapper.find('[data-testid="microcontroller"]').hostNodes()

    expect(chipText.text()).toEqual("Išjugtas arba neveikia kažkuris sensorius")
  })

  it("display ijungta microcontroller", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <GreenhouseControlComponent
          greenhouseControl={{
            is_temperature_auto: 1,
            is_humidity_auto: 1,
            max_temperature: 40,
            min_humidity: 40,
            manual_fans: 0,
            manual_light: 0,
            manual_water: 0,
            water_level: 0,
            is_active: 1,
          }}
        />
      </ThemeProvider>
    )
    const chipText = wrapper.find('[data-testid="microcontroller"]').hostNodes()

    expect(chipText.text()).toEqual("Įjungtas")
  })
})
