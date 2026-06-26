import { Router } from 'express';

const router = Router();

// GET /api/xdr/alerts
router.get('/alerts', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 24,
      critical: 3,
      high: 7,
      medium: 9,
      low: 5,
      alerts: [
        { id: 1, type: 'Malware', severity: 'critical', source: 'Endpoint-01', timestamp: new Date().toISOString() },
        { id: 2, type: 'Phishing', severity: 'high', source: 'Email-02', timestamp: new Date().toISOString() },
        { id: 3, type: 'DDoS', severity: 'critical', source: 'Network-03', timestamp: new Date().toISOString() }
      ]
    }
  });
});

// GET /api/xdr/events
router.get('/events', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, source: 'Endpoint', event: 'Process Creation', details: 'cmd.exe /c ...', timestamp: new Date().toISOString() },
      { id: 2, source: 'Network', event: 'Connection', details: '192.168.1.100 -> 8.8.8.8', timestamp: new Date().toISOString() }
    ]
  });
});

// POST /api/xdr/respond
router.post('/respond', (req, res) => {
  const { alertId, action } = req.body;
  res.json({
    success: true,
    data: {
      alertId,
      action: action || 'block',
      status: 'executed',
      message: 'Action exécutée avec succès',
      timestamp: new Date().toISOString()
    }
  });
});

export default router;
