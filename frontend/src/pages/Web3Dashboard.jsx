import React from 'react';
import { Web3Provider, WalletConnector, ContractViewer, TransactionSender } from '../components/Web3';

function Web3Dashboard() {
  return (
    <Web3Provider>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: '#1A2332',
          borderRadius: '12px',
          border: '1px solid #2A3A4A'
        }}>
          <span style={{ color: '#94A3B8' }}> Interaction avec la Blockchain</span>
          <WalletConnector />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <ContractViewer />
          <TransactionSender />
        </div>
      </div>
    </Web3Provider>
  );
}

export default Web3Dashboard;
