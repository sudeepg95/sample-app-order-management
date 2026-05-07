// @vitest-environment jsdom
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import App from "./App";
import { INITIAL_ORDER, PENDING_ORDER } from "./constants";
import * as mockClient from "./api/mockClient";

afterEach(cleanup);

const mockFetchedOrder = { ...PENDING_ORDER, status: "PACKING" as const };

async function clickFetchAndWait() {
  const fetchButton = screen.getByRole("button", {
    name: /FETCH NEXT ORDER/i,
  });
  fireEvent.click(fetchButton);
  await waitFor(() =>
    expect(screen.getByText(/ACTIVE PACKING/i)).toBeInTheDocument(),
  );
}

describe("App component", () => {
  beforeEach(() => {
    vi.spyOn(mockClient, "fetchNextOrder").mockResolvedValue(mockFetchedOrder);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading screen while fetching order", async () => {
    let resolveOrder!: (order: typeof mockFetchedOrder) => void;
    vi.spyOn(mockClient, "fetchNextOrder").mockReturnValue(
      new Promise((resolve) => {
        resolveOrder = resolve;
      }),
    );

    render(<App />);

    const fetchButton = screen.getByRole("button", {
      name: /FETCH NEXT ORDER/i,
    });
    fireEvent.click(fetchButton);

    expect(screen.getByText(/FETCHING ORDER/i)).toBeInTheDocument();

    await act(async () => {
      resolveOrder(mockFetchedOrder);
    });

    await waitFor(() =>
      expect(screen.getByText(/ACTIVE PACKING/i)).toBeInTheDocument(),
    );
  });

  it("handleFetchOrder transitions to packing with fetched order", async () => {
    render(<App />);

    await clickFetchAndWait();

    const scanButtons = screen.getAllByRole("button", {
      name: /SCAN \/ PACK/i,
    });
    expect(scanButtons.length).toBe(mockFetchedOrder.itemIds.length);
  });

  it("handleScanItem updates item quantity and correctly marks as fully packed", async () => {
    render(<App />);

    await clickFetchAndWait();

    // Both fetched order items require 1 each
    const scan1of1Btns = screen.getAllByRole("button", {
      name: /SCAN \/ PACK 1 OF 1/i,
    });
    fireEvent.click(scan1of1Btns[0]);

    const verifiedMatches = screen.getAllByText(/VERIFIED MATCH/i);
    expect(verifiedMatches.length).toBe(1);
  });

  it("handleReportOpening opens the exception modal and handleExceptionSubmit closes it", async () => {
    render(<App />);

    await clickFetchAndWait();

    const exceptionButtons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("SCAN"));

    fireEvent.click(exceptionButtons[0]);

    expect(screen.getByText(/REPORT EXCEPTION/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/MISSING/i));

    const submitBtn = screen.getByRole("button", { name: /SUBMIT EXCEPTION/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText(/REPORT EXCEPTION/i)).not.toBeInTheDocument();
    });
  });

  it("completes full flow from fetch to dispatch to standby", async () => {
    render(<App />);

    await clickFetchAndWait();

    // Both fetched order items require 1 each — scan them
    const scan1of1Btns = screen.getAllByRole("button", {
      name: /SCAN \/ PACK 1 OF 1/i,
    });
    fireEvent.click(scan1of1Btns[0]);
    fireEvent.click(
      screen.getAllByRole("button", { name: /SCAN \/ PACK 1 OF 1/i })[0],
    );

    const dispatchBtn = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    expect(dispatchBtn).not.toBeDisabled();
    fireEvent.click(dispatchBtn);

    expect(screen.getByText(/DISPATCH READY/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /COMPLETE SHIPMENT/i }));
    expect(
      screen.getByRole("button", { name: /FETCH NEXT ORDER/i }),
    ).toBeInTheDocument();
  });

  it("fetch button is disabled while loading", async () => {
    let resolveOrder!: (order: typeof mockFetchedOrder) => void;
    vi.spyOn(mockClient, "fetchNextOrder").mockReturnValue(
      new Promise((resolve) => {
        resolveOrder = resolve;
      }),
    );

    const { unmount } = render(<App />);

    const fetchButton = screen.getByRole("button", {
      name: /FETCH NEXT ORDER/i,
    });

    // Button should be enabled initially
    expect(fetchButton).not.toBeDisabled();

    fireEvent.click(fetchButton);

    // Loading screen replaces the standby screen — button gone
    expect(screen.queryByRole("button", { name: /FETCH NEXT ORDER/i })).not
      .toBeInTheDocument();

    await act(async () => {
      resolveOrder(mockFetchedOrder);
    });

    unmount();
  });

  it("INITIAL_ORDER items length is available (regression guard)", () => {
    expect(INITIAL_ORDER.itemIds.length).toBeGreaterThan(0);
  });
});
