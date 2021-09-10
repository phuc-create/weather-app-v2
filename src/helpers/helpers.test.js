import {
  calculatePlots,
  checkTimeCurve,
  handleResizeWidth,
  objectTest,
} from "./helpers";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { dataEdit } from "../apis/WeatherDataMock";
afterEach(cleanup);
describe("helpers suite", () => {
  it("calculate plots for chart should work correctly", () => {
    expect(calculatePlots(dataEdit)).toStrictEqual(objectTest);
  });
  it("returns the reasonable value for the curve", () => {
    expect(checkTimeCurve(6)).toBe(0.7);
    expect(checkTimeCurve(24)).toBe(0.7);
  });
  it("returns the correct width for the chart", () => {
    expect(handleResizeWidth(47)).toBe(6933);
  });
});
