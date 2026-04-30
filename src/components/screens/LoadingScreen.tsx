import React from "react";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="border-4 border-pitch-black bg-white p-16 shadow-[12px_12px_0px_0px_rgba(3,7,18,1)] flex flex-col items-center gap-8">
        <div className="w-16 h-16 border-8 border-pitch-black border-t-primary-yellow animate-spin" />
        <p className="font-headline text-3xl font-black uppercase tracking-widest">
          FETCHING ORDER...
        </p>
      </div>
    </div>
  );
};
