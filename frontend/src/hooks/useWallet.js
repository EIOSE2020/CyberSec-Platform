import { useState, useEffect } from 'react';

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAddress('0x1234...5678');
      setBalance('2.5 ETH');
      setIsConnected(true);
    }, 1000);
  }, []);

  return { address, balance, isConnected };
}
