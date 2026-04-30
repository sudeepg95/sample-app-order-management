import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 w-full flex justify-end items-center py-2 pr-8 z-50 pointer-events-none">
      <div className="flex items-center gap-3 border-4 border-pitch-black px-4 py-2 bg-white shadow-hard-sm pointer-events-auto">
        <div className="w-4 h-4 bg-signal-green border-2 border-pitch-black rounded-full" />
        <span className="font-mono text-sm font-black uppercase tracking-widest leading-none mt-0.5">
          SYSTEM ONLINE
        </span>
      </div>
    </header>
  );
};
