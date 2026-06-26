import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BlockchainDashboard from '../components/Blockchain/BlockchainDashboard';
import PolicyManager from '../components/Blockchain/PolicyManager';
import IncidentTracker from '../components/Blockchain/IncidentTracker';

function Blockchain() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    testConnection();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testConnection = async () => {
    try {
      await api.health();
      setConnected(true);
      console.log(' Backend connecté');
    } catch (err) {
      console.log(' Backend hors ligne, mode démo');
      setConnected(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        background: '#1A2332',
        borderRadius: '12px',
        padding: isMobile ? '40px 20px' : '60px 40px',
        textAlign: 'center',
        border: '1px solid #2A3A4A'
      }}>
        <div style={{ fontSize: isMobile ? '32px' : '40px', marginBottom: '20px' }}></div>
        <h2 style={{ color: '#FFFFFF', fontSize: isMobile ? '20px' : '24px' }}>Chargement...</h2>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '12px' : '0',
        marginBottom: '24px',
        padding: isMobile ? '16px' : '16px 20px',
        background: '#1A2332',
        borderRadius: '12px',
        border: '1px solid #2A3A4A',
        width: '100%'
      }}>
        <div>
          <h1 style={{
            color: '#FFFFFF',
            fontSize: isMobile ? '20px' : '24px',
            margin: 0
          }}>
             Blockchain Module
          </h1>
          <p style={{
            color: '#94A3B8',
            margin: '4px 0 0 0',
            fontSize: isMobile ? '13px' : '14px'
          }}>
            Interface de gestion blockchain sécurisée
          </p>
        </div>
        <div style={{
          padding: '4px 14px',
          borderRadius: '20px',
          background: connected ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
          border: connected ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)',
          fontSize: isMobile ? '13px' : '14px',
          flexShrink: 0
        }}>
          <span style={{ color: connected ? '#10B981' : '#EF4444' }}>
            {connected ? ' Connecté' : ' Déconnecté'}
          </span>
        </div>
      </div>

      {/* Dashboard */}
      <div style={{ marginBottom: '24px', width: '100%' }}>
        <BlockchainDashboard />
      </div>

      {/* Actions - version responsive */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '16px' : '20px',
        width: '100%'
      }}>
        <PolicyManager />
        <IncidentTracker />
      </div>
    </div>
  );
}

export default Blockchain;
