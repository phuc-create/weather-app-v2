import React from "react";
import chai from "chai";
import "@testing-library/jest-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { cleanup } from "@testing-library/react";
import { AnimationCloudy, AnimationRainny } from "./AnimationCloud";
import Header from "../Header/Header";
Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);
describe("animation suite", () => {
  it("Render component without crashing", () => {
    const wrapper = shallow(<AnimationCloudy />);
    expect(wrapper.contains(<div className="testing-component"></div>)).toBe(
      true
    );
  });

  it("render animation of cloudy", () => {
    const wrapper = shallow(<Header />);
    chai.expect(wrapper.find(AnimationRainny)).to.have.lengthOf(0);
  });
});
