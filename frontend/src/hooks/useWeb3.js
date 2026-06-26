import { useState, useEffect } from 'react';
export function useWeb3() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(false); }, []);
  return { account, loading, connect: () => {}, disconnect: () => {} };
}
