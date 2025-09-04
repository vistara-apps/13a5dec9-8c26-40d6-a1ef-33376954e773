'use client';

import { ReactNode } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="font-semibold text-text">AdSpark AI</span>
          </div>
          <ConnectWallet />
        </div>
      </header>
      
      <main className="container py-8 animate-fade-in">
        {children}
      </main>
      
      <footer className="border-t bg-surface/50 mt-16">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 AdSpark AI. Powered by Base & OnchainKit.</p>
        </div>
      </footer>
    </div>
  );
}
