import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from "../Header";

it("Render higher order component corectly", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header />, div);
});
