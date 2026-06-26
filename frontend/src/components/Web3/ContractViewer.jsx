import React, { useState } from 'react';

function ContractViewer() {
  const [contractId, setContractId] = useState('');
  const [data, setData] = useState(null);

  const handleRead = () => {
    setData({
      id: contractId || '0',
      name: 'Security Policy #1',
      status: 'Active',
      creator: '0x1234...5678',
      createdAt: new Date().toLocaleString()
    });
  };

  return (
    <div style={{background:'#0A0F1A',borderRadius:'8px',padding:'20px',border:'1px solid #2A3A4A'}}>
      <h3 style={{color:'#3B82F6'}}> Lire Contrat</h3>
      <div style={{display:'flex',gap:'8px',margin:'12px 0'}}>
        <input value={contractId} onChange={(e) => setContractId(e.target.value)} placeholder="ID du contrat" style={{flex:1,padding:'8px',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF'}} />
        <button onClick={handleRead} style={{padding:'8px 16px',background:'#3B82F6',border:'none',borderRadius:'4px',color:'#FFFFFF',cursor:'pointer'}}>Lire</button>
      </div>
      {data && (
        <div style={{background:'#1A2332',borderRadius:'4px',padding:'12px'}}>
          <div><strong style={{color:'#FFFFFF'}}>Nom:</strong> <span style={{color:'#94A3B8'}}>{data.name}</span></div>
          <div><strong style={{color:'#FFFFFF'}}>Status:</strong> <span style={{color:'#10B981'}}>{data.status}</span></div>
          <div><strong style={{color:'#FFFFFF'}}>Créateur:</strong> <span style={{color:'#94A3B8'}}>{data.creator}</span></div>
          <div><strong style={{color:'#FFFFFF'}}>Créé le:</strong> <span style={{color:'#94A3B8'}}>{data.createdAt}</span></div>
        </div>
      )}
    </div>
  );
}

export default ContractViewer;
