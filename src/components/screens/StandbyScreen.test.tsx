// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StandbyScreen } from "./StandbyScreen";

describe("StandbyScreen component", () => {
  it("renders correctly", () => {
    const mockOnFetchOrder = vi.fn();
    render(<StandbyScreen onFetchOrder={mockOnFetchOrder} />);

    // Check for massive action button text
    const fetchButton = screen.getByRole("button", {
      name: /FETCH NEXT ORDER/i,
    });
    expect(fetchButton).toBeInTheDocument();
  });

  it("calls onFetchOrder when the action button is clicked", () => {
    const mockOnFetchOrder = vi.fn();
    render(<StandbyScreen onFetchOrder={mockOnFetchOrder} />);

    const fetchButton = screen.getByRole("button", {
      name: /FETCH NEXT ORDER/i,
    });
    fireEvent.click(fetchButton);

    expect(mockOnFetchOrder).toHaveBeenCalledTimes(1);
  });
});
