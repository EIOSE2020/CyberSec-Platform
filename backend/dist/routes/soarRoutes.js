"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/soar/playbooks
router.get('/playbooks', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: 'Phishing Response', status: 'active', lastRun: new Date().toISOString() },
            { id: 2, name: 'Ransomware Mitigation', status: 'active', lastRun: new Date().toISOString() },
            { id: 3, name: 'Data Exfiltration', status: 'inactive', lastRun: new Date().toISOString() }
        ]
    });
});
// POST /api/soar/execute
router.post('/execute', (req, res) => {
    const { playbookId, context } = req.body;
    res.json({
        success: true,
        data: {
            executionId: Date.now(),
            playbookId,
            status: 'running',
            startedAt: new Date().toISOString(),
            steps: [
                { id: 1, name: 'Analyse', status: 'completed' },
                { id: 2, name: 'Bloquer IP', status: 'running' },
                { id: 3, name: 'Notifier SOC', status: 'pending' }
            ]
        }
    });
});
// GET /api/soar/executions
router.get('/executions', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, playbook: 'Phishing Response', status: 'completed', duration: '12s', timestamp: new Date().toISOString() },
            { id: 2, playbook: 'Ransomware Mitigation', status: 'running', duration: '45s', timestamp: new Date().toISOString() }
        ]
    });
});
exports.default = router;
