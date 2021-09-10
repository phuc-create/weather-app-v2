import ReactDOM from "react-dom";
import Charts from "./Charts";
import * as chartFn from "./Charts";
import * as helpersFn from "../../helpers/helpers";
import { dataEdit } from "../../apis/WeatherDataMock";
import { cleanup, fireEvent } from "@testing-library/react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
//using ject mock to test function called
helpersFn.calculatePlots = jest.fn();
helpersFn.handleResizeWidth = jest.fn();
helpersFn.checkTimeCurve = jest.fn();
afterEach(cleanup);
describe("chart suite", () => {
  const documentClickEvent = new Event("resize");
  it("Render chart without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Charts />, div);
  });
  it("calculate plots of night time", () => {
    chartFn.execCalculatePlots(dataEdit);
    expect(helpersFn.calculatePlots).toHaveBeenCalledWith(dataEdit);
  });
  it("handle resize width depend on innerWidth", () => {
    chartFn.exechandleResizeWidth(dataEdit.length);
    expect(helpersFn.handleResizeWidth).toHaveBeenCalledWith(dataEdit.length);
  });
  it("handle resize with when resize of window", () => {
    fireEvent.change(window, chartFn.exechandleResizeWidth(dataEdit.length));
    expect(helpersFn.handleResizeWidth).toHaveBeenCalledWith(dataEdit.length);
  });
  const timeCurveTest = Number(dataEdit[0].dt_txt.slice(0, 2));
  it("check time of curve with value", () => {
    chartFn.execCheckTimeCurve(timeCurveTest);
    expect(helpersFn.checkTimeCurve).toHaveBeenCalledWith(timeCurveTest);
  });
});
