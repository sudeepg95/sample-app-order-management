// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExceptionReportingModal } from "./ExceptionReportingModal";
import { LineItem } from "../../types";

const mockItem: LineItem = {
  id: "item1",
  product: { id: "p1", sku: "SKU123", name: "Test Product", image: "test.jpg" },
  location: { zone: "A", aisle: 1, shelf: "B", bin: 1 },
  quantityRequired: 1,
  quantityPacked: 0,
  isFullyPacked: false,
};

describe("ExceptionReportingModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  it("renders nothing when item is null", () => {
    const { container } = render(
      <ExceptionReportingModal
        item={null}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when isOpen is false", () => {
    const { container } = render(
      <ExceptionReportingModal
        item={mockItem}
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders correctly when open with an item", () => {
    render(
      <ExceptionReportingModal
        item={mockItem}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByText(/REPORT EXCEPTION/i)).toBeInTheDocument();
    expect(screen.getByText(/SKU123/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });

  it("enables submit button only after selecting a type", () => {
    render(
      <ExceptionReportingModal
        item={mockItem}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const submitBtn = screen.getByRole("button", { name: /SUBMIT EXCEPTION/i });
    expect(submitBtn).toBeDisabled();

    const missingBtn = screen.getByRole("button", { name: /MISSING/i });
    fireEvent.click(missingBtn);

    expect(submitBtn).not.toBeDisabled();
  });

  it("calls onSubmit with selected type and notes", () => {
    render(
      <ExceptionReportingModal
        item={mockItem}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /DAMAGED/i }));

    const notesArea = screen.getByPlaceholderText(
      /ENTER SPECIFIC ANOMALY DETAILS HERE/i,
    );
    fireEvent.change(notesArea, { target: { value: "Broken package" } });

    fireEvent.click(screen.getByRole("button", { name: /SUBMIT EXCEPTION/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      type: "DAMAGED",
      notes: "Broken package",
    });
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <ExceptionReportingModal
        item={mockItem}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /CANCEL/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
