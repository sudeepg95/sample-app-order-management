import { useState } from "react";
import { fetchNextOrder, packOrderItem, reportException, handoverException } from "../api/mockClient";
import { Order } from "../types";

export function useOrderWorkflow() {
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [isPackingItem, setIsPackingItem] = useState(false);

  const fetchOrder = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const fetchedOrder = await fetchNextOrder();
      setOrder(fetchedOrder);
    } finally {
      setIsFetching(false);
    }
  };

  const packItem = async (orderId: string, itemId: string) => {
    if (isPackingItem) return false;
    setIsPackingItem(true);
    try {
      const response = await packOrderItem(orderId, itemId);
      return response.success;
    } finally {
      setIsPackingItem(false);
    }
  };

  const submitException = async (orderId: string, itemId: string, type: string, notes: string) => {
    await reportException(orderId, itemId, type, notes);
  };

  const dispatchExceptionOrder = async (orderId: string) => {
    await handoverException(orderId);
  };

  return { isFetching, order, fetchOrder, isPackingItem, packItem, submitException, dispatchExceptionOrder };
}
