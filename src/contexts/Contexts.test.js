import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContextProvider from "./Contexts";
import App from "../App";
import Header from "../components/Header/Header";
afterEach(cleanup);
describe("context suite", () => {
  it("Context updated by state from reducer", () => {
    const { container, getByText } = render(
      <ContextProvider>
        <App>
          <Header />
        </App>
      </ContextProvider>
    );
    expect(getByText(/Loading/i).textContent).toBe("Loading ...");
  });
});
