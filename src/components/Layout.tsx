import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-industrial-gray text-pitch-black font-body overflow-hidden relative">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full relative pt-15 min-h-0">
        {children}
      </main>
    </div>
  );
};
