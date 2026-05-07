// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActivePackingScreen } from "./ActivePackingScreen";
import { Order } from "../../types";

const mockOrder: Order = {
  id: "123",
  priority: "STANDARD",
  status: "PACKING",
  items: {
    item1: {
      id: "item1",
      product: { id: "p1", sku: "SKU1", name: "Product 1" },
      location: { zone: "A", aisle: 1, shelf: "B", bin: 1 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
    },
  },
  itemIds: ["item1"],
};

describe("ActivePackingScreen", () => {
  const mockOnScanItem = vi.fn();
  const mockOnReportException = vi.fn();
  const mockOnDispatch = vi.fn();

  it("disables the dispatch button when items are not fully packed", () => {
    render(
      <ActivePackingScreen
        order={mockOrder}
        onScanItem={mockOnScanItem}
        onReportException={mockOnReportException}
        onDispatch={mockOnDispatch}
      />,
    );

    const dispatchButton = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    expect(dispatchButton).toBeDisabled();
  });

  it("enables the dispatch button when all items are fully packed", () => {
    const fullyPackedOrder: Order = {
      ...mockOrder,
      items: {
        item1: {
          ...mockOrder.items["item1"],
          quantityPacked: 1,
          isFullyPacked: true,
        },
      },
    };

    render(
      <ActivePackingScreen
        order={fullyPackedOrder}
        onScanItem={mockOnScanItem}
        onReportException={mockOnReportException}
        onDispatch={mockOnDispatch}
      />,
    );

    const dispatchButton = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    expect(dispatchButton).not.toBeDisabled();
  });

  it("handles partially packed states (some items packed, some not)", () => {
    const partiallyPackedOrder: Order = {
      ...mockOrder,
      items: {
        item1: {
          id: "item1",
          product: { id: "p1", sku: "SKU1", name: "Product 1" },
          location: { zone: "A", aisle: 1, shelf: "B", bin: 1 },
          quantityRequired: 1,
          quantityPacked: 1,
          isFullyPacked: true,
        },
        item2: {
          id: "item2",
          product: { id: "p2", sku: "SKU2", name: "Product 2" },
          location: { zone: "A", aisle: 1, shelf: "B", bin: 2 },
          quantityRequired: 1,
          quantityPacked: 0,
          isFullyPacked: false,
        },
      },
      itemIds: ["item1", "item2"],
    };

    render(
      <ActivePackingScreen
        order={partiallyPackedOrder}
        onScanItem={mockOnScanItem}
        onReportException={mockOnReportException}
        onDispatch={mockOnDispatch}
      />,
    );

    const dispatchButton = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    expect(dispatchButton).toBeDisabled();
  });

  it("is complete when there are zero items in the order", () => {
    const zeroItemOrder: Order = {
      ...mockOrder,
      items: {},
      itemIds: [],
    };

    render(
      <ActivePackingScreen
        order={zeroItemOrder}
        onScanItem={mockOnScanItem}
        onReportException={mockOnReportException}
        onDispatch={mockOnDispatch}
      />,
    );

    const dispatchButton = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    // isComplete = (0 === 0) => true
    expect(dispatchButton).not.toBeDisabled();
  });
});
