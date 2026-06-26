import { useState, useEffect } from 'react';

export function useContract(address, abi) {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    if (address && abi) {
      setContract({ address, abi, methods: ['read', 'write'] });
    }
  }, [address, abi]);

  return { contract, loading };
}
