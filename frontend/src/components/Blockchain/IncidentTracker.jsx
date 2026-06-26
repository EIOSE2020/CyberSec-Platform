import React, { useState } from 'react';
import { api } from '../../services/api';

function IncidentTracker() {
  const [form, setForm] = useState({ title: '', description: '', severity: 3 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.reportIncident(form);
      setMessage(' Incident signalé avec succès !');
      setForm({ title: '', description: '', severity: 3 });
    } catch (error) {
      setMessage(' Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background:'#0A0F1A',borderRadius:'8px',padding:'20px',border:'1px solid #2A3A4A'}}>
      <h3 style={{color:'#EF4444',marginBottom:'16px'}}> Signaler un Incident</h3>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Titre de l'incident" 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Description détaillée" 
          rows="2" 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}} 
          required 
        />
        <select 
          name="severity" 
          value={form.severity} 
          onChange={handleChange} 
          style={{width:'100%',padding:'10px',margin:'8px 0',background:'#1A2332',border:'1px solid #2A3A4A',borderRadius:'4px',color:'#FFFFFF',boxSizing:'border-box'}}
        >
          <option value="1">1 - Information</option>
          <option value="2">2 - Faible</option>
          <option value="3">3 - Moyen</option>
          <option value="4">4 - Élevé</option>
          <option value="5">5 - Critique</option>
        </select>
        <button 
          type="submit" 
          disabled={loading} 
          style={{width:'100%',padding:'12px',background:loading ? '#4B5563' : '#EF4444',border:'none',borderRadius:'4px',color:'#FFFFFF',cursor:loading ? 'not-allowed' : 'pointer',fontSize:'16px'}}
        >
          {loading ? ' Signalement...' : ' Signaler l\'incident'}
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

export default IncidentTracker;
