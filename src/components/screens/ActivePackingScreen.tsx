import React from "react";
import { QrCode, AlertCircle, CheckCircle } from "lucide-react";
import { Order } from "../../types";

interface ActivePackingScreenProps {
  order: Order;
  onScanItem: (id: string) => void;
  onReportException: (id: string) => void;
  onDispatch: () => void;
}

export const ActivePackingScreen: React.FC<ActivePackingScreenProps> = ({
  order,
  onScanItem,
  onReportException,
  onDispatch,
}) => {
  const packedCount = order.items.filter((i) => i.isFullyPacked).length;
  const isComplete = packedCount === order.items.length;
  const progressPercent = (packedCount / order.items.length) * 100;

  return (
    <div className="w-full max-w-6xl p-8 pt-0 flex flex-col gap-8 flex-1 mx-auto min-h-0 relative">
      {/* Header Block */}
      <div className="p-8 bg-white border-4 border-pitch-black shadow-hard flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative overflow-hidden shrink-0">
        <div className="relative z-10">
          <div className="inline-block bg-pitch-black text-primary-yellow font-mono font-bold text-sm px-4 py-1 mb-4 uppercase tracking-widest shadow-hard-sm">
            ORDER #{order.id}
          </div>
          <h1 className="font-headline font-black text-6xl uppercase tracking-tighter leading-none">
            ACTIVE PACKING
          </h1>
        </div>

        <div className="w-full lg:w-[400px] relative z-10">
          <div className="flex justify-between items-end mb-3">
            <span className="font-mono font-black text-xs uppercase tracking-widest opacity-60">
              SYSTEM_PROGRESS
            </span>
            <span className="font-mono font-black text-lg">
              {packedCount} / {order.items.length} ITEMS
            </span>
          </div>
          <div className="h-8 w-full border-4 border-pitch-black bg-industrial-gray relative">
            <div
              className={`absolute top-0 left-0 h-full border-r-4 border-pitch-black ${isComplete ? "bg-signal-green animate-pulse" : "bg-primary-yellow"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Subtle industrial background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-[172px] -mx-4 px-4 pt-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {order.items.map((item, index) => {
            const binLocation = `Z:${item.location.zone} A:${item.location.aisle} S:${item.location.shelf} B:${item.location.bin}`;
            return (
              <div
                key={item.id}
                className={`
              border-4 border-pitch-black shadow-hard flex flex-col relative group transition-none
              ${item.isFullyPacked ? "bg-green-100" : "bg-white"}
            `}
              >
                <div
                  className={`
              absolute -top-4 -left-4 border-4 border-pitch-black px-4 py-1 z-10 shadow-hard-sm transition-none
              ${item.isFullyPacked ? "bg-signal-green text-white" : "bg-primary-yellow text-pitch-black"}
            `}
                >
                  <span className="font-mono font-black text-xs uppercase">
                    {item.isFullyPacked
                      ? `ITEM 0${index + 1} - PACKED`
                      : `ITEM 0${index + 1}`}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                  {/* Product Visual */}
                  <div
                    className={`w-full md:w-56 aspect-square border-b-4 md:border-b-0 md:border-r-4 border-pitch-black flex-shrink-0 p-6 flex items-center justify-center relative overflow-hidden transition-none ${item.isFullyPacked ? "bg-green-50" : "bg-industrial-gray"}`}
                  >
                    <img
                      referrerPolicy="no-referrer"
                      src={item.product.image}
                      alt={item.product.name}
                      className={`
                    object-contain w-full h-full grayscale mix-blend-multiply transition-none
                    ${item.isFullyPacked ? "opacity-30 blur-[2px]" : "opacity-90 contrast-125"}
                  `}
                    />
                    {item.isFullyPacked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle
                          size={80}
                          className="text-signal-green drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3
                        className={`font-headline font-bold text-4xl uppercase tracking-tight mb-1 transition-none ${item.isFullyPacked ? "line-through opacity-40" : ""}`}
                      >
                        {item.product.name}
                      </h3>
                      <p className="font-mono font-black text-xl opacity-40">
                        {item.product.sku}
                      </p>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between items-center font-mono text-xs opacity-60">
                        <span>
                          QTY: {item.quantityPacked} / {item.quantityRequired}
                        </span>
                        {item.weight && <span>WT: {item.weight}</span>}
                      </div>

                      {/* Bin Location */}
                      <div
                        className={`
                    p-4 border-4 transition-none
                    ${
                      item.isFullyPacked
                        ? "bg-green-200 border-pitch-black/20 text-pitch-black/40"
                        : "bg-pitch-black text-primary-yellow border-primary-yellow shadow-hard-sm"
                    }
                  `}
                      >
                        <p className="font-mono text-[10px] mb-1 uppercase opacity-60">
                          Bin Location
                        </p>
                        <p className="font-mono font-black text-2xl tracking-tighter whitespace-nowrap">
                          {binLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Interaction Layer */}
                {!item.isFullyPacked ? (
                  <div className="border-t-4 border-pitch-black flex h-16">
                    <button
                      onClick={() => onScanItem(item.id)}
                      className="flex-1 bg-primary-yellow font-headline font-black text-2xl uppercase tracking-widest hover:bg-white active:bg-industrial-gray transition-none border-r-4 border-pitch-black flex items-center justify-center gap-3 active:translate-y-0.5"
                    >
                      <QrCode size={24} />
                      SCAN / PACK {item.quantityPacked + 1} OF{" "}
                      {item.quantityRequired}
                    </button>
                    <button
                      onClick={() => onReportException(item.id)}
                      className="w-20 bg-alert-red flex items-center justify-center hover:bg-white hover:text-alert-red transition-none text-white active:translate-y-0.5"
                    >
                      <AlertCircle size={32} />
                    </button>
                  </div>
                ) : (
                  <div className="border-t-4 border-pitch-black h-16 flex items-center justify-center bg-signal-green px-8 transition-none">
                    <span className="font-headline font-black text-2xl text-white uppercase tracking-widest flex items-center gap-2">
                      VERIFIED MATCH <CheckCircle size={24} />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Persistence Floating Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-industrial-gray border-t-4 border-pitch-black z-20 flex justify-between items-stretch gap-4 transition-none">
        <div className="bg-white border-4 border-pitch-black px-8 py-5 shadow-hard-sm hidden sm:flex items-center gap-4 transition-none flex-1">
          <div
            className={`w-4 h-4 border-2 border-pitch-black rounded-none transition-none ${isComplete ? "bg-signal-green animate-pulse" : "bg-industrial-gray"}`}
          />
          <span className="font-mono font-black text-xl uppercase tracking-tighter opacity-80">
            {isComplete ? "ALL ITEMS VERIFIED" : "AWAITING BATCH COMPLETION..."}
          </span>
        </div>

        <button
          disabled={!isComplete}
          onClick={onDispatch}
          className={`
            min-h-[5rem] py-5 px-12 border-4 border-pitch-black font-headline font-black text-3xl uppercase tracking-widest flex items-center justify-center gap-4 transition-none
            ${
              isComplete
                ? "bg-signal-green text-white shadow-hard hover:bg-green-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
                : "bg-white opacity-20 cursor-not-allowed"
            }
          `}
        >
          <span>DISPATCH PARCEL</span>
          <CheckCircle size={32} />
        </button>
      </div>
    </div>
  );
};
