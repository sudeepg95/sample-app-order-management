// @vitest-environment jsdom
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";
import { INITIAL_ORDER } from "./constants";

afterEach(cleanup);

describe("App component", () => {
  it("handleFetchOrder sets current screen to packing and resets order", () => {
    render(<App />);

    const fetchButton = screen.getByRole("button", {
      name: /FETCH NEXT ORDER/i,
    });
    expect(fetchButton).toBeInTheDocument();

    fireEvent.click(fetchButton);

    const packingHeading = screen.getByText(/ACTIVE PACKING/i);
    expect(packingHeading).toBeInTheDocument();

    const scanButtons = screen.getAllByRole("button", {
      name: /SCAN \/ PACK/i,
    });
    expect(scanButtons.length).toBe(INITIAL_ORDER.items.length);
  });

  it("handleScanItem updates item quantity and correctly marks as fully packed", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /FETCH NEXT ORDER/i }));

    // First item: requires 1
    const scan1of1Btns = screen.getAllByRole("button", {
      name: /SCAN \/ PACK 1 OF 1/i,
    });
    fireEvent.click(scan1of1Btns[0]);

    const verifiedMatches = screen.getAllByText(/VERIFIED MATCH/i);
    expect(verifiedMatches.length).toBe(1);

    // Third item: requires 2
    const thirdItemScanBtn = screen.getByRole("button", {
      name: /SCAN \/ PACK 1 OF 2/i,
    });
    fireEvent.click(thirdItemScanBtn);

    const updatedThirdItemScanBtn = screen.getByRole("button", {
      name: /SCAN \/ PACK 2 OF 2/i,
    });
    expect(updatedThirdItemScanBtn).toBeInTheDocument();

    fireEvent.click(updatedThirdItemScanBtn);

    const newVerifiedMatches = screen.getAllByText(/VERIFIED MATCH/i);
    expect(newVerifiedMatches.length).toBe(2);
  });

  it("handleReportOpening opens the exception modal and handleExceptionSubmit closes it", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /FETCH NEXT ORDER/i }));

    // Find an exception report button (the red ones with AlertCircle)
    const exceptionButtons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("SCAN"));

    fireEvent.click(exceptionButtons[0]);

    // Modal should open
    expect(screen.getByText(/REPORT EXCEPTION/i)).toBeInTheDocument();

    // Select an issue type (e.g., MISSING)
    fireEvent.click(screen.getByText(/MISSING/i));

    // Submit the exception
    const submitBtn = screen.getByRole("button", { name: /SUBMIT EXCEPTION/i });
    fireEvent.click(submitBtn);

    // Modal should be gone
    await waitFor(() => {
      expect(screen.queryByText(/REPORT EXCEPTION/i)).not.toBeInTheDocument();
    });
  });

  it("completes full flow from fetch to dispatch to standby", () => {
    render(<App />);

    // 1. Fetch Order
    fireEvent.click(screen.getByRole("button", { name: /FETCH NEXT ORDER/i }));

    // 2. Scan all items
    // First item: 1 of 1
    fireEvent.click(
      screen.getAllByRole("button", { name: /SCAN \/ PACK 1 OF 1/i })[0],
    );
    // Second item: 1 of 1
    fireEvent.click(
      screen.getAllByRole("button", { name: /SCAN \/ PACK 1 OF 1/i })[0],
    );
    // Third item: 1 of 2, then 2 of 2
    fireEvent.click(
      screen.getByRole("button", { name: /SCAN \/ PACK 1 OF 2/i }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /SCAN \/ PACK 2 OF 2/i }),
    );

    // 3. Dispatch
    const dispatchBtn = screen.getByRole("button", {
      name: /DISPATCH PARCEL/i,
    });
    expect(dispatchBtn).not.toBeDisabled();
    fireEvent.click(dispatchBtn);

    // 4. Verify Dispatch screen
    expect(screen.getByText(/DISPATCH READY/i)).toBeInTheDocument();

    // 5. Complete shipment and return to standby
    fireEvent.click(screen.getByRole("button", { name: /COMPLETE SHIPMENT/i }));
    expect(
      screen.getByRole("button", { name: /FETCH NEXT ORDER/i }),
    ).toBeInTheDocument();
  });
});
