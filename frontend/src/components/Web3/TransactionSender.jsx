import React, { useState } from 'react';

function TransactionSender() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = () => {
    if (!to || !amount) {
      setStatus(' Veuillez remplir tous les champs');
      return;
    }
    setStatus(' Transaction envoyée...');
    setTimeout(() => {
      setStatus(' Transaction confirmée !');
    }, 2000);
  };

  return (
    <div style={{background:'#0A0F1A',borderRadius:'8px',padding:'20px',border:'1px solid #2A3A4A'}}>
      <h3 style={{color:'#10B981'}}> Envoyer</h3>
      <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Adresse destinataire" style={{width:'100%',padding:'8px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF'}} />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Montant (ETH)" type="number" style={{width:'100%',padding:'8px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF'}} />
      <button onClick={handleSend} style={{width:'100%',padding:'10px',background:'#10B981',border:'none',borderRadius:'4px',color:'#FFFFFF',cursor:'pointer'}}> Envoyer</button>
      {status && <div style={{marginTop:'8px',color:status.includes('')?'#10B981':'#F59E0B'}}>{status}</div>}
    </div>
  );
}

export default TransactionSender;
