import React, { createContext, useContext, useState, useEffect } from 'react';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const connect = async () => {
    setLoading(true);
    setTimeout(() => {
      setAccount('0x1234567890123456789012345678901234567890');
      setIsConnected(true);
      setLoading(false);
    }, 1000);
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
  };

  return (
    <Web3Context.Provider value={{ account, isConnected, loading, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within Web3Provider');
  return context;
}
