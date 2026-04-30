import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X, Check, Flag } from "lucide-react";
import { LineItem, ExceptionType } from "../../types";

interface ExceptionReportingModalProps {
  item: LineItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { type: ExceptionType; notes: string }) => void;
}

const issueTypes: ExceptionType[] = [
  "MISSING",
  "DAMAGED",
  "WRONG ITEM",
  "BARCODE UNREADABLE",
];

export const ExceptionReportingModal: React.FC<
  ExceptionReportingModalProps
> = ({ item, isOpen, onClose, onSubmit }) => {
  const [selectedType, setSelectedType] = useState<ExceptionType | null>(null);
  const [notes, setNotes] = useState("");

  if (!item) return null;

  const binLocation = `Z:${item.location.zone} A:${item.location.aisle} S:${item.location.shelf} B:${item.location.bin}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-pitch-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-industrial-gray border-4 border-pitch-black shadow-[16px_16px_0px_0px_#030712] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-alert-red border-b-4 border-pitch-black px-8 py-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-5">
                <AlertTriangle
                  size={48}
                  fill="white"
                  className="text-alert-red"
                />
                <h2 className="font-headline text-4xl font-black uppercase tracking-tight">
                  REPORT EXCEPTION
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-14 h-14 flex items-center justify-center border-4 border-white hover:bg-white hover:text-alert-red transition-none active:translate-y-1"
              >
                <X size={32} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 flex flex-col lg:flex-row gap-12 overflow-y-auto">
              {/* Left Column: Item Blueprint */}
              <div className="lg:w-1/3 flex flex-col items-center">
                <div className="relative w-full bg-white border-4 border-pitch-black pt-12 px-6 pb-6 shadow-hard">
                  {/* Hanging Asset Tag */}
                  <div className="absolute -top-4 -left-4 bg-pitch-black text-primary-yellow font-mono text-xs font-black px-4 py-2 border-2 border-pitch-black shadow-hard-sm uppercase tracking-widest ring-4 ring-primary-yellow">
                    TARGET ITEM
                  </div>

                  <div className="aspect-square bg-industrial-gray border-4 border-pitch-black mb-6 relative overflow-hidden group">
                    <img
                      referrerPolicy="no-referrer"
                      src={item.product.image}
                      alt={item.product.sku}
                      className="w-full h-full object-contain grayscale mix-blend-multiply opacity-90 contrast-150 p-4"
                    />
                    <div className="absolute inset-0 bg-alert-red/5 animate-pulse pointer-events-none" />
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <span className="font-mono text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">
                      SKU CODE
                    </span>
                    <span className="font-mono text-xl font-black tracking-tighter leading-none">
                      {item.product.sku}
                    </span>
                  </div>

                  <div className="pt-6 border-t-2 border-pitch-black/20">
                    <p className="font-body text-sm font-black mb-6 uppercase tracking-tight opacity-70 leading-tight">
                      {item.product.name} - System Manifest Match
                    </p>

                    {/* Bin Identity */}
                    <div className="bg-primary-yellow border-4 border-pitch-black p-4 flex flex-col gap-1 shadow-hard-sm">
                      <span className="font-mono text-[10px] font-black uppercase opacity-60 leading-none">
                        BIN IDENTITY
                      </span>
                      <span className="font-headline text-3xl font-black tracking-widest text-pitch-black leading-none">
                        {binLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Form */}
              <div className="lg:w-2/3 flex flex-col">
                <p className="font-body text-lg mb-10 font-bold opacity-80 leading-relaxed max-w-xl">
                  Please classify the anomaly with the highlighted inventory
                  item. This will alert shift command and suspend batch
                  processing for STATION-04.
                </p>

                <div className="flex flex-col gap-10">
                  {/* Issue Classification */}
                  <div className="space-y-4">
                    <label className="block font-mono text-sm font-black uppercase tracking-widest opacity-60">
                      CLASSIFY ISSUE (INPUT REQUIRED)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {issueTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`
                            p-5 border-4 flex items-center justify-between text-left transition-none
                            ${
                              selectedType === type
                                ? "bg-primary-yellow border-pitch-black shadow-[inset_6px_0_0_0_#030712]"
                                : "bg-white border-pitch-black hover:bg-white/50 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            }
                          `}
                        >
                          <span className="font-mono text-sm font-black uppercase tracking-wider">
                            {type}
                          </span>
                          {selectedType === type && (
                            <Check size={20} className="text-pitch-black" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Operational Notes */}
                  <div className="space-y-4">
                    <label className="block font-mono text-sm font-black uppercase tracking-widest opacity-60">
                      OPERATOR NOTES (OPTIONAL LOG)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border-4 border-pitch-black p-6 font-mono text-base focus:bg-primary-yellow focus:outline-none transition-none shadow-hard-sm resize-none"
                      placeholder="ENTER SPECIFIC ANOMALY DETAILS HERE..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white border-t-4 border-pitch-black p-8 flex flex-col md:flex-row justify-end gap-6 mt-auto">
              <button
                onClick={onClose}
                className="h-20 px-10 border-4 border-pitch-black font-headline text-3xl font-black uppercase hover:bg-industrial-gray active:translate-x-1 active:translate-y-1 active:shadow-none shadow-hard transition-none"
              >
                CANCEL
              </button>
              <button
                disabled={!selectedType}
                onClick={() => onSubmit({ type: selectedType!, notes })}
                className={`
                  h-20 px-10 border-4 border-pitch-black font-headline text-3xl font-black uppercase flex items-center justify-center gap-4 transition-all
                  ${
                    selectedType
                      ? "bg-alert-red text-white shadow-hard hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
                      : "bg-white opacity-20 cursor-not-allowed"
                  }
                `}
              >
                <Flag size={28} fill="currentColor" />
                SUBMIT EXCEPTION
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
