import { render, screen } from "@testing-library/react";

import App from "./app";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
  });

  it("contains an element with a 'time-left' id", () => {
    render(<App />);
    const element = screen.getByTestId("time-left-element");
    expect(element.id).toBe("time-left");
  });
});
