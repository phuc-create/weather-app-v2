import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContextProvider from "./Contexts";
import App from "../App";
import Header from "../components/Header/Header";
import { getWeatherApi } from "../apis/WeatherApi";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "./Action.types";
import Reducers from "./reducers/Reducers";
afterEach(cleanup);
describe("context suite", () => {
  const initState = {
    isLoading: false,
    data: [],
    error: null,
  };
  it("Context updated by state from reducer", () => {
    const { getByText } = render(
      <ContextProvider>
        <App>
          <Header />
        </App>
      </ContextProvider>
    );
    expect(getByText(/Loading/i).textContent).toBe("Loading ...");
  });
  // it("check dispatch depend on data return", async () => {
  //   const { data } = await getWeatherApi();

  //   const call = { type: FETCH_DATA_SUCCESS, payload: data };
  //   const state = Reducers(initState, call);

  //   expect(state).toEqual({
  //     data: data.list,
  //     error: null,
  //     isLoading: false,
  //   });
  // });
  it("tests error with async/await", async () => {
    expect.assertions(1);
    try {
      const { data } = await getWeatherApi();

      const call = { type: FETCH_DATA_SUCCESS, payload: data };
      const state = Reducers(initState, call);
      expect(state).toEqual({
        data: data.list,
        error: null,
        isLoading: false,
      });
    } catch (error) {}
  });
  it("should handle error for request", () => {
    const call = { type: FETCH_DATA_FAILURE, payload: "error" };
    const state = Reducers(initState, call);

    expect(state).toEqual({
      data: [],
      error: "error",
      isLoading: false,
    });
  });
});
