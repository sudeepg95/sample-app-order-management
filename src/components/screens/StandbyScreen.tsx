import React from "react";
import { Hourglass, ArrowRight } from "lucide-react";
import { STATION_ID } from "../../constants";

interface StandbyScreenProps {
  onFetchOrder: () => void;
  isLoading?: boolean;
}

export const StandbyScreen: React.FC<StandbyScreenProps> = ({
  onFetchOrder,
  isLoading = false,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
      {/* Central Content Box */}
      <div className="flex flex-col items-center justify-center gap-12 w-full max-w-4xl border-4 border-pitch-black bg-white p-16 shadow-[12px_12px_0px_0px_rgba(3,7,18,1)]">
        {/* Central Visual */}
        <div className="w-32 h-32 border-4 border-pitch-black flex items-center justify-center bg-industrial-gray shadow-hard">
          <Hourglass size={64} className="text-pitch-black/20" />
        </div>

        {/* Text Info */}
        <div className="text-center space-y-4">
          <h1 className="font-headline text-7xl font-black uppercase text-pitch-black tracking-tight leading-none">
            AWAITING ASSIGNMENT
          </h1>
          <p className="font-mono text-lg font-bold text-pitch-black/60 uppercase tracking-wide">
            {STATION_ID} IS READY. PLEASE INITIATE NEXT SEQUENCE.
          </p>
        </div>

        {/* Massive Action Button */}
        <button
          onClick={onFetchOrder}
          disabled={isLoading}
          className="w-[400px] h-[120px] bg-primary-yellow text-pitch-black border-4 border-pitch-black shadow-[8px_8px_0px_0px_#030712] flex flex-col items-center justify-center gap-2 hover:bg-yellow-300 active:translate-x-2 active:translate-y-2 active:shadow-none transition-none group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[8px_8px_0px_0px_#030712]"
        >
          <div className="flex items-center gap-4 relative z-10">
            <span className="font-headline text-5xl font-black uppercase tracking-tighter">
              FETCH NEXT ORDER
            </span>
            <ArrowRight
              size={32}
              className="group-hover:translate-x-1 transition-none"
            />
          </div>

          {/* Dynamic Stripe background on button */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
        </button>
      </div>

      {/* Background Dots Grid */}
      <div
        className="absolute -z-10 inset-0 pointer-events-none opacity-5 origin-center"
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};
