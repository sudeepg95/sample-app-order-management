import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSession, fetchNextOrder } from "./mockClient";
import { STATION_ID } from "../constants";
import { Order } from "../types";

const VALID_PRIORITIES = ["STANDARD", "NEXT_DAY", "URGENT"];

function assertOrderShape(order: Order) {
  expect(order.id).toMatch(/^ORD-\d{4}$/);
  expect(VALID_PRIORITIES).toContain(order.priority);
  expect(order.status).toBe("PACKING");
  expect(order.itemIds.length).toBeGreaterThanOrEqual(2);
  expect(order.itemIds.length).toBeLessThanOrEqual(5);
  order.itemIds.forEach((id) => {
    const item = order.items[id];
    expect(item.id).toMatch(/^item_\d+$/);
    expect(item.product).toMatchObject({
      id: expect.any(String),
      sku: expect.any(String),
      name: expect.any(String),
    });
    expect(item.location).toMatchObject({
      zone: expect.any(String),
      aisle: expect.any(Number),
      shelf: expect.any(String),
      bin: expect.any(Number),
    });
    expect(item.quantityRequired).toBeGreaterThanOrEqual(1);
    expect(item.quantityRequired).toBeLessThanOrEqual(3);
    expect(item.quantityPacked).toBe(0);
    expect(item.isFullyPacked).toBe(false);
  });
}

describe("getSession", () => {
  it("resolves with correct station id, operative id, and active orders", async () => {
    const session = await getSession();
    expect(session.stationId).toBe(STATION_ID);
    expect(session.operativeId).toBe("OPR-001");
    expect(session.activeOrders).toHaveLength(1);
    assertOrderShape(session.activeOrders[0]);
  });
});

describe("fetchNextOrder", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves with a valid PACKING order after 1500ms", async () => {
    const promise = fetchNextOrder();
    vi.advanceTimersByTime(1500);
    const order = await promise;
    assertOrderShape(order);
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
