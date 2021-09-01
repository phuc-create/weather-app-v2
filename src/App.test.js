import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
const app = () => render;
it("App rendered without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
