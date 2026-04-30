// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders fetching message", () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/FETCHING ORDER/i)).toBeInTheDocument();
  });

  it("renders a spinner element", () => {
    const { container } = render(<LoadingScreen />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
