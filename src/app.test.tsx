import { render, screen } from "@testing-library/react";

import App from "./app";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);

    screen.debug();
  });
});
