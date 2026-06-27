"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/siem/events
router.get('/events', (req, res) => {
    res.json({
        success: true,
        data: {
            total: 1247,
            events: [
                { id: 1, type: 'Login Failure', severity: 'high', source: '192.168.1.10', timestamp: new Date().toISOString() },
                { id: 2, type: 'Firewall Block', severity: 'medium', source: 'FW-01', timestamp: new Date().toISOString() },
                { id: 3, type: 'Malware Detected', severity: 'critical', source: 'Endpoint-05', timestamp: new Date().toISOString() }
            ]
        }
    });
});
// GET /api/siem/stats
router.get('/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalEvents: 1247,
            critical: 12,
            high: 45,
            medium: 234,
            low: 956,
            sources: {
                endpoints: 567,
                network: 234,
                cloud: 446
            }
        }
    });
});
// POST /api/siem/search
router.post('/search', (req, res) => {
    const { query, timeframe } = req.body;
    res.json({
        success: true,
        data: {
            query,
            timeframe: timeframe || '24h',
            results: [
                { id: 1, event: 'Correspondance trouvée', timestamp: new Date().toISOString() },
                { id: 2, event: 'Correspondance trouvée', timestamp: new Date().toISOString() }
            ],
            total: 2
        }
    });
});
exports.default = router;
