import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

function BlockchainDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getBlockchainStats();
      setStats(data);
    } catch (error) {
      console.error('Erreur:', error);
      setStats({ totalPolicies: 0, activePolicies: 0, totalIncidents: 0, totalThreats: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{color:'#94A3B8',textAlign:'center',padding:'20px'}}> Chargement...</div>;

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'16px'}}>
      <StatCard title="Politiques" value={stats?.totalPolicies || 0} icon="" />
      <StatCard title="Actives" value={stats?.activePolicies || 0} icon="" />
      <StatCard title="Incidents" value={stats?.totalIncidents || 0} icon="" />
      <StatCard title="Menaces" value={stats?.totalThreats || 0} icon="" />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div style={{background:'#0A0F1A',borderRadius:'8px',padding:'16px',textAlign:'center',border:'1px solid #2A3A4A'}}>
      <div style={{fontSize:'24px'}}>{icon}</div>
      <div style={{fontSize:'24px',fontWeight:'bold',color:'#FFFFFF'}}>{value}</div>
      <div style={{color:'#94A3B8',fontSize:'12px'}}>{title}</div>
    </div>
  );
}

export default BlockchainDashboard;
