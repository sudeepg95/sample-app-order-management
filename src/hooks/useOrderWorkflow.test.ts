// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useOrderWorkflow } from "./useOrderWorkflow";
import * as mockClient from "../api/mockClient";
import { PENDING_ORDER } from "../constants";

const mockFetchedOrder = { ...PENDING_ORDER, status: "PACKING" as const };

describe("useOrderWorkflow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("starts with isFetching false and no order", () => {
    const { result } = renderHook(() => useOrderWorkflow());
    expect(result.current.isFetching).toBe(false);
    expect(result.current.order).toBeNull();
  });

  it("sets isFetching to true while fetching and false after", async () => {
    const fetchedOrder = { ...PENDING_ORDER, status: "PACKING" as const };
    vi.spyOn(mockClient, "fetchNextOrder").mockResolvedValue(fetchedOrder);

    const { result } = renderHook(() => useOrderWorkflow());

    act(() => {
      void result.current.fetchOrder();
    });

    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.order).toEqual(fetchedOrder);
  });

  it("resets isFetching to false and leaves order null when fetch rejects", async () => {
    vi.spyOn(mockClient, "fetchNextOrder").mockRejectedValue(
      new Error("network error"),
    );

    const { result } = renderHook(() => useOrderWorkflow());

    await act(async () => {
      await result.current.fetchOrder().catch(() => {});
    });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.order).toBeNull();
  });

  it("prevents double-fetch when already fetching", async () => {
    let resolveFirst!: (o: typeof mockFetchedOrder) => void;
    const fetchSpy = vi
      .spyOn(mockClient, "fetchNextOrder")
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveFirst = resolve;
        }),
      )
      .mockResolvedValue({ ...PENDING_ORDER, status: "PACKING" as const });

    const { result } = renderHook(() => useOrderWorkflow());

    // Start first fetch
    act(() => {
      void result.current.fetchOrder();
    });

    expect(result.current.isFetching).toBe(true);

    // Attempt second fetch while first is in-flight — should be a no-op
    act(() => {
      void result.current.fetchOrder();
    });

    await act(async () => {
      resolveFirst({ ...PENDING_ORDER, status: "PACKING" as const });
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
