import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
afterEach(cleanup);
test("App rendered without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
