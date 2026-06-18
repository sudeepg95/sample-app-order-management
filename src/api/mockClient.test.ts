import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSession, fetchNextOrder } from "./mockClient";
import { INITIAL_ORDER, PENDING_ORDER, STATION_ID } from "../constants";

describe("getSession", () => {
  it("resolves with correct station id, operative id, and active orders", async () => {
    const session = await getSession();
    expect(session.stationId).toBe(STATION_ID);
    expect(session.operativeId).toBe("OPR-001");
    expect(session.activeOrders).toEqual([INITIAL_ORDER]);
  });
});

describe("fetchNextOrder", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves with PENDING_ORDER in PACKING status after 1500ms", async () => {
    const promise = fetchNextOrder();
    vi.advanceTimersByTime(1500);
    const order = await promise;
    expect(order).toEqual({ ...PENDING_ORDER, status: "PACKING" });
  });

  it("does not resolve before the 1500ms delay elapses", async () => {
    let resolved = false;
    const p = fetchNextOrder().then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(1499);
    await Promise.resolve();
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await p;
    expect(resolved).toBe(true);
  });
});
