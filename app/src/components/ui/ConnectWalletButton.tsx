'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          Connect Wallet
        </Button>
        <Button variant="primary" size="sm" href="/wallet">
          Launch App
        </Button>
      </div>
    );
  }

  return <ConnectButton />;
}