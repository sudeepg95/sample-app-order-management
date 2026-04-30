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
