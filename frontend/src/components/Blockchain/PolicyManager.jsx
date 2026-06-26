import React, { useState } from 'react';
import { api } from '../../services/api';

function PolicyManager() {
  const [form, setForm] = useState({ name: '', description: '', policyHash: '', expiresAt: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.createPolicy(form);
      setMessage(' Politique créée avec succès !');
      setForm({ name: '', description: '', policyHash: '', expiresAt: '' });
    } catch (error) {
      setMessage(' Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background:'#0A0F1A',borderRadius:'8px',padding:'20px',border:'1px solid #2A3A4A'}}>
      <h3 style={{color:'#3B82F6',marginBottom:'16px'}}> Nouvelle Politique</h3>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Nom de la politique" 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Description" 
          rows="2" 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <input 
          name="policyHash" 
          value={form.policyHash} 
          onChange={handleChange} 
          placeholder="Hash de la politique" 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <input 
          name="expiresAt" 
          type="datetime-local" 
          value={form.expiresAt} 
          onChange={handleChange} 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{width:'100%',padding:'12px',background:loading ? '#4B5563' : '#3B82F6',border:'none',borderRadius:'4px',color:'#FFFFFF',cursor:loading ? 'not-allowed' : 'pointer',fontSize:'16px'}}
        >
          {loading ? ' Création...' : ' Créer la politique'}
        </button>
      </form>
      {message && (
        <div style={{
          marginTop:'12px',
          padding:'10px',
          borderRadius:'4px',
          background: message.includes('') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          color: message.includes('') ? '#10B981' : '#EF4444',
          textAlign:'center'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default PolicyManager;
