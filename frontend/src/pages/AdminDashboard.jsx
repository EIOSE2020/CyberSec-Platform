import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// ✅ FORCER l'URL du backend local
const API_URL = 'http://localhost:5000';

function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(`${API_URL}/api/admin/users`);
      setUsers(usersRes.data.data || []);
      setStats({
        totalUsers: usersRes.data.data?.length || 0,
        admins: usersRes.data.data?.filter(u => u.role === 'ADMIN').length || 0,
        analysts: usersRes.data.data?.filter(u => u.role === 'SECURITY_ANALYST').length || 0
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#94A3B8' }}>
        ⏳ Chargement...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', marginBottom: '8px', color: '#FFFFFF' }}>
        ⚙️ Administration
      </h1>
      <p style={{ color: '#94A3B8', marginBottom: '24px' }}>
        Bienvenue, {user?.firstName} {user?.lastName} ({user?.role})
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard title="Total Utilisateurs" value={stats.totalUsers} icon="👥" />
        <StatCard title="Administrateurs" value={stats.admins} icon="🛡️" />
        <StatCard title="Analystes" value={stats.analysts} icon="🔍" />
      </div>

      <div style={{
        background: '#1A2332',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #2A3A4A'
      }}>
        <h2 style={{ color: '#FFFFFF', marginBottom: '16px' }}>👤 Utilisateurs</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2A3A4A' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#94A3B8' }}>Nom</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#94A3B8' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#94A3B8' }}>Rôle</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#94A3B8' }}>Département</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#94A3B8' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #1A2332' }}>
                  <td style={{ padding: '12px', color: '#FFFFFF' }}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: user.role === 'ADMIN' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: user.role === 'ADMIN' ? '#3B82F6' : '#10B981'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{user.department || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: user.isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: user.isActive ? '#10B981' : '#EF4444'
                    }}>
                      {user.isActive ? '✅ Actif' : '❌ Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div style={{
      background: '#1A2332',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #2A3A4A',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '28px' }}>{icon}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' }}>{value}</div>
      <div style={{ color: '#94A3B8', fontSize: '14px' }}>{title}</div>
    </div>
  );
}

export default AdminDashboard;