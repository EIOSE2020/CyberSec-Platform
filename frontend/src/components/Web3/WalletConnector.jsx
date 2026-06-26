import React from 'react';
import { useWeb3 } from './Web3Provider';

function WalletConnector() {
  const { account, isConnected, loading, connect, disconnect } = useWeb3();

  if (loading) return <span style={{color:'#94A3B8'}}>...</span>;

  if (isConnected && account) {
    return (
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <span style={{color:'#10B981'}}> {account.slice(0,6)}...{account.slice(-4)}</span>
        <button onClick={disconnect} style={{padding:'6px 12px',background:'transparent',border:'1px solid #EF4444',borderRadius:'4px',color:'#EF4444',cursor:'pointer'}}>Déconnecter</button>
      </div>
    );
  }

  return (
    <button onClick={connect} style={{padding:'10px 20px',background:'#3B82F6',border:'none',borderRadius:'4px',color:'#FFFFFF',cursor:'pointer'}}>
       Connecter Wallet
    </button>
  );
}

export default WalletConnector;
