/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { StandbyScreen } from "./components/screens/StandbyScreen";
import { ActivePackingScreen } from "./components/screens/ActivePackingScreen";
import { ExceptionReportingModal } from "./components/modals/ExceptionReportingModal";
import { Screen, LineItem, ExceptionType, Order } from "./types";
import { INITIAL_ORDER } from "./constants";
import { getSession } from "./api/mockClient";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("standby");
  const [order, setOrder] = useState<Order>(INITIAL_ORDER);

  useEffect(() => {
    void getSession();
  }, []);
  const [exceptionItem, setExceptionItem] = useState<LineItem | null>(null);
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);

  const handleFetchOrder = () => {
    // Reset items for a fresh "order"
    setOrder({
      ...INITIAL_ORDER,
    });
    setCurrentScreen("packing");
  };

  const handleScanItem = (id: string) => {
    setOrder((prev) => {
      const itemIndex = prev.items.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prev;

      const item = prev.items[itemIndex];
      const newQty = item.quantityPacked + 1;

      const updatedItems = [...prev.items];
      updatedItems[itemIndex] = {
        ...item,
        quantityPacked: newQty,
        isFullyPacked: newQty >= item.quantityRequired,
      };

      return { ...prev, items: updatedItems };
    });
  };

  const handleReportOpening = (id: string) => {
    const item = order.items.find((i) => i.id === id) || null;
    setExceptionItem(item);
    setIsExceptionModalOpen(true);
  };

  const handleExceptionSubmit = (_data: {
    type: ExceptionType;
    notes: string;
  }) => {
    // console.log("Exception Submitted:", { item: exceptionItem, ...data });
    setIsExceptionModalOpen(false);
    // In a real app, this would alert a supervisor and maybe remove the item
  };

  return (
    <Layout>
      {currentScreen === "standby" && (
        <StandbyScreen onFetchOrder={handleFetchOrder} />
      )}

      {currentScreen === "packing" && (
        <ActivePackingScreen
          order={order}
          onScanItem={handleScanItem}
          onReportException={handleReportOpening}
          onDispatch={() => setCurrentScreen("dispatch")}
        />
      )}

      {currentScreen === "dispatch" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div className="flex flex-col items-center justify-center gap-12 w-full max-w-4xl border-4 border-pitch-black bg-white p-16 shadow-[12px_12px_0px_0px_rgba(3,7,18,1)]">
            <h1 className="font-headline text-7xl font-black uppercase">
              DISPATCH READY
            </h1>
            <p className="font-mono text-xl opacity-60 font-bold uppercase tracking-widest leading-none">
              ORDER #{order.id} CLEARED
            </p>
            <button
              onClick={() => setCurrentScreen("standby")}
              className="h-20 px-12 bg-signal-green text-white border-4 border-pitch-black shadow-hard font-headline text-3xl uppercase tracking-widest hover:bg-green-700 active:translate-x-1 active:translate-y-1 active:shadow-none transition-none"
            >
              COMPLETE SHIPMENT
            </button>
          </div>
        </div>
      )}

      <ExceptionReportingModal
        item={exceptionItem}
        isOpen={isExceptionModalOpen}
        onClose={() => setIsExceptionModalOpen(false)}
        onSubmit={handleExceptionSubmit}
      />
    </Layout>
  );
}
