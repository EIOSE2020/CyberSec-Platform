import { Router } from 'express';

const router = Router();

// GET /api/threathunting/queries
router.get('/queries', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Lateral Movement', status: 'active', lastRun: new Date().toISOString() },
      { id: 2, name: 'Suspicious PowerShell', status: 'active', lastRun: new Date().toISOString() },
      { id: 3, name: 'DGA Domains', status: 'inactive', lastRun: new Date().toISOString() }
    ]
  });
});

// POST /api/threathunting/execute
router.post('/execute', (req, res) => {
  const { queryId, parameters } = req.body;
  res.json({
    success: true,
    data: {
      huntId: Date.now(),
      queryId,
      status: 'running',
      findings: [
        { id: 1, description: 'Activité suspecte détectée', severity: 'high', evidence: '...' },
        { id: 2, description: 'Pattern anormal', severity: 'medium', evidence: '...' }
      ],
      startedAt: new Date().toISOString()
    }
  });
});

// GET /api/threathunting/findings
router.get('/findings', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, description: 'Tentative de mouvement latéral', severity: 'critical', status: 'investigating' },
      { id: 2, description: 'Commandes PowerShell suspectes', severity: 'high', status: 'resolved' }
    ]
  });
});

export default router;
