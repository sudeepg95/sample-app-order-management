import { INITIAL_ORDER, PENDING_ORDER, STATION_ID } from "../constants";
import { Order } from "../types";

export interface Session {
  stationId: string;
  operativeId: string;
  activeOrders: Order[];
}

export async function getSession(): Promise<Session> {
  return {
    stationId: STATION_ID,
    operativeId: "OPR-001",
    activeOrders: [INITIAL_ORDER],
  };
}

export async function fetchNextOrder(): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { ...PENDING_ORDER, status: "PACKING" };
}

export async function packOrderItem(
  orderId: string,
  itemId: string,
): Promise<{ success: boolean; orderId: string; itemId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true, orderId, itemId };
}

export async function reportException(
  orderId: string,
  itemId: string,
  _type: string,
  _notes: string,
): Promise<{ success: boolean; orderId: string; itemId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, orderId, itemId };
}

export async function handoverException(_orderId: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
}
