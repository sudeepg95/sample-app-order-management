// @vitest-environment jsdom
/**
 * Integration test: full warehouse packing operative user journey.
 *
 * Covers the end-to-end flow without mocking any React components — only the
 * async API layer is stubbed so tests run synchronously.
 */
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import App from "./App";
import { PENDING_ORDER } from "./constants";
import * as mockClient from "./api/mockClient";

afterEach(cleanup);

const mockFetchedOrder = { ...PENDING_ORDER, status: "PACKING" as const };

describe("User journey: warehouse packing workflow", () => {
  beforeEach(() => {
    vi.spyOn(mockClient, "fetchNextOrder").mockResolvedValue(mockFetchedOrder);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("completes the full packing cycle: standby → fetch → pack all items → dispatch → standby", async () => {
    render(<App />);

    // PHASE 1: Operative sees standby screen
    expect(
      screen.getByRole("button", { name: /FETCH NEXT ORDER/i }),
    ).toBeInTheDocument();

    // PHASE 2: Operative fetches an order — loading screen appears immediately
    fireEvent.click(screen.getByRole("button", { name: /FETCH NEXT ORDER/i }));
    expect(screen.getByText(/FETCHING ORDER/i)).toBeInTheDocument();

    // PHASE 3: Packing screen appears once the order resolves
    await waitFor(() =>
      expect(screen.getByText(/ACTIVE PACKING/i)).toBeInTheDocument(),
    );
    expect(
      screen.getByText(new RegExp(mockFetchedOrder.id)),
    ).toBeInTheDocument();

    // Dispatch button is disabled until all items are scanned
    expect(
      screen.getByRole("button", { name: /DISPATCH PARCEL/i }),
    ).toBeDisabled();

    // PHASE 4: Operative reports an exception on the first item then cancels
    const exceptionTriggerBtn = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          !btn.textContent?.includes("SCAN") &&
          !btn.textContent?.includes("DISPATCH") &&
          !btn.textContent?.includes("FETCH"),
      );
    expect(exceptionTriggerBtn).toBeDefined();
    fireEvent.click(exceptionTriggerBtn!);
    expect(screen.getByText(/REPORT EXCEPTION/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /CANCEL/i }));
    await waitFor(() =>
      expect(screen.queryByText(/REPORT EXCEPTION/i)).not.toBeInTheDocument(),
    );

    // PHASE 5: Operative scans all items (PENDING_ORDER has 2 items, qty 1 each)
    fireEvent.click(
      screen.getAllByRole("button", { name: /SCAN \/ PACK 1 OF 1/i })[0],
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: /SCAN \/ PACK 1 OF 1/i })[0],
    );

    expect(screen.getAllByText(/VERIFIED MATCH/i)).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /DISPATCH PARCEL/i }),
    ).not.toBeDisabled();

    // PHASE 6: Operative dispatches the parcel
    fireEvent.click(screen.getByRole("button", { name: /DISPATCH PARCEL/i }));
    expect(screen.getByText(/DISPATCH READY/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`ORDER #${mockFetchedOrder.id} CLEARED`)),
    ).toBeInTheDocument();

    // PHASE 7: Operative completes shipment and returns to standby
    fireEvent.click(screen.getByRole("button", { name: /COMPLETE SHIPMENT/i }));
    expect(
      screen.getByRole("button", { name: /FETCH NEXT ORDER/i }),
    ).toBeInTheDocument();
  });

  it("reports an exception and submits it, closing the modal", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /FETCH NEXT ORDER/i }));
    await waitFor(() =>
      expect(screen.getByText(/ACTIVE PACKING/i)).toBeInTheDocument(),
    );

    const exceptionTriggerBtn = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          !btn.textContent?.includes("SCAN") &&
          !btn.textContent?.includes("DISPATCH") &&
          !btn.textContent?.includes("FETCH"),
      );
    fireEvent.click(exceptionTriggerBtn!);

    expect(screen.getByText(/REPORT EXCEPTION/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /DAMAGED/i }));
    fireEvent.click(screen.getByRole("button", { name: /SUBMIT EXCEPTION/i }));

    await waitFor(() =>
      expect(screen.queryByText(/REPORT EXCEPTION/i)).not.toBeInTheDocument(),
    );

    // Packing continues normally after exception is reported
    expect(screen.getByText(/ACTIVE PACKING/i)).toBeInTheDocument();
  });
});
