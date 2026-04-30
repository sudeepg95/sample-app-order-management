import { useState } from "react";
import { fetchNextOrder } from "../api/mockClient";
import { Order } from "../types";

export function useOrderWorkflow() {
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = async () => {
    if (isFetching) return;
    setIsFetching(true);
    const fetchedOrder = await fetchNextOrder();
    setOrder(fetchedOrder);
    setIsFetching(false);
  };

  return { isFetching, order, fetchOrder };
}
