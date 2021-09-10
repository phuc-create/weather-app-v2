import React from "react";
import Header, { WeatherSummary, WeatherDetails } from "./Header";
import chai from "chai";
import "@testing-library/jest-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { cleanup, render, screen } from "@testing-library/react";
import { AnimationCloudy, AnimationRainny } from "../Animations/AnimationCloud";
Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);
describe("a suite render of component", () => {
  it("Render component without crashing", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.contains(<div className="header__logo">myENV</div>)).toBe(
      true
    );
  });

  it("render weather summary as child component", () => {
    const wrapper = shallow(<Header />);
    // eslint-disable-next-line jest/valid-expect
    chai.expect(wrapper.find(WeatherSummary)).to.have.lengthOf(1);
  });
  it("render weather summary with props", () => {
    const { rerender } = render(<WeatherSummary status="Clouds" />);
    expect(screen.getByTestId("cloudy-display")).toBeInTheDocument(
      <AnimationCloudy />
    );

    // re-render the same component with different props
    rerender(<WeatherSummary status="Rainny" />);
    expect(screen.getByTestId("rainy-display")).toBeInTheDocument(
      <AnimationRainny />
    );
  });
  it("render weather details as child component", () => {
    const wrapper = shallow(<Header />);
    // eslint-disable-next-line jest/valid-expect
    chai.expect(wrapper.find(WeatherDetails)).to.have.lengthOf(1);
  });

  it("should be selectable by class 'weather__details'", () => {
    expect(shallow(<WeatherDetails />).is(".weather__details")).toBe(true);
  });
});
