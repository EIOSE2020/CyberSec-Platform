import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Blockchain', path: '/blockchain', icon: '' },
  { name: 'Web3', path: '/web3', icon: '' },
  { name: 'Admin', path: '/admin', icon: '', adminOnly: true },
];

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'ADMIN';

  const filteredNav = navigation.filter(item => !item.adminOnly || isAdmin);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => { if (isMobile) setSidebarOpen(false); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0F1A' }}>
      {isMobile && sidebarOpen && (
        <div onClick={closeSidebar} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 999
        }} />
      )}

      <div style={{
        width: isMobile ? (sidebarOpen ? '280px' : '0px') : '240px',
        background: '#1A2332',
        borderRight: '1px solid #2A3A4A',
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        position: isMobile ? 'fixed' : 'sticky',
        top: 0, left: 0, height: '100vh', zIndex: 1000,
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #2A3A4A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#3B82F6', fontSize: '18px', margin: 0 }}> CyberSec</h1>
            {isMobile && (
              <button onClick={closeSidebar} style={{
                background: 'transparent', border: 'none',
                color: '#94A3B8', fontSize: '24px', cursor: 'pointer'
              }}></button>
            )}
          </div>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '4px 0 0' }}>
            {user?.email}
          </p>
        </div>

        <nav style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          {filteredNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              style={{
                display: 'flex', alignItems: 'center', padding: '12px 16px',
                marginBottom: '8px', borderRadius: '8px', textDecoration: 'none',
                color: location.pathname === item.path ? '#3B82F6' : '#94A3B8',
                background: location.pathname === item.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
              }}
            >
              <span style={{ marginRight: '12px' }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #2A3A4A' }}>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px',
            color: '#EF4444', cursor: 'pointer'
          }}>
             Déconnexion
          </button>
        </div>
      </div>

      <div style={{
        flex: 1, padding: isMobile ? '12px' : '20px', marginLeft: isMobile ? 0 : 0,
        width: '100%', maxWidth: '100%', overflowX: 'hidden'
      }}>
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '12px 16px' : '16px 24px', background: '#1A2332',
          borderRadius: '12px', marginBottom: '24px', border: '1px solid #2A3A4A'
        }}>
          <button onClick={toggleSidebar} style={{
            background: 'transparent', border: 'none', color: '#94A3B8',
            fontSize: isMobile ? '22px' : '24px', cursor: 'pointer'
          }}></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#3B82F6', fontSize: isMobile ? '14px' : '16px' }}>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </header>
        <main><Outlet /></main>
      </div>
    </div>
  );
}

export default Layout;
