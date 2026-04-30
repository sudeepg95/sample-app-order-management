import { INITIAL_ORDER, STATION_ID } from "../constants";
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
