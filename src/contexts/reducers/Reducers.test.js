import "@testing-library/jest-dom";
import { getWeatherApi } from "../../apis/WeatherApi";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_ANY,
} from "../Action.types";
import Reducers from "./Reducers";
describe("reducers suite", () => {
  const initState = {
    isLoading: false,
    data: [],
    error: null,
  };
  it("should set loading true when call request fetch data", () => {
    const callAction = { type: FETCH_DATA_REQUEST };
    const newStateFromCallAction = Reducers(initState, callAction);
    expect(newStateFromCallAction).toEqual({
      data: [],
      error: null,
      isLoading: true,
    });
  });
  it("should return data when fetch data successfully", async () => {
    const { data } = await getWeatherApi();

    const callAction = { type: FETCH_DATA_SUCCESS, payload: data };
    const newStateFromCallAction = Reducers(initState, callAction);

    expect(newStateFromCallAction).toEqual({
      data: data.list,
      error: null,
      isLoading: false,
    });
  });
  it("should return error when fetch data failure", async () => {
    const callAction = { type: FETCH_DATA_FAILURE, payload: "error" };
    const newStateFromCallAction = Reducers(initState, callAction);

    expect(newStateFromCallAction).toEqual({
      data: [],
      error: "error",
      isLoading: false,
    });
  });
  it("should return default state when not match any case", async () => {
    const callAction = { type: FETCH_DATA_ANY };
    const newStateFromCallAction = Reducers(initState, callAction);

    expect(newStateFromCallAction).toEqual({
      data: [],
      error: null,
      isLoading: false,
    });
  });
});
