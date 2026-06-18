import { STATION_ID } from "../constants";
import { Order } from "../types";
import { generateOrder } from "../utils/orderGenerator";

export interface Session {
  stationId: string;
  operativeId: string;
  activeOrders: Order[];
}

export async function getSession(): Promise<Session> {
  return {
    stationId: STATION_ID,
    operativeId: "OPR-001",
    activeOrders: [generateOrder("PACKING")],
  };
}

export async function fetchNextOrder(): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return generateOrder("PACKING");
}
