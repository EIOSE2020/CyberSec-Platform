"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/blockchain/stats
router.get('/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalPolicies: 42,
            activePolicies: 38,
            totalIncidents: 127,
            totalThreats: 56,
            timestamp: new Date().toISOString()
        }
    });
});
// GET /api/blockchain/active-policies
router.get('/active-policies', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: 'Zero Trust Policy', description: 'Accès restreint', active: true },
            { id: 2, name: 'MFA Policy', description: 'Authentification multi-facteurs', active: true }
        ]
    });
});
// GET /api/blockchain/incidents
router.get('/incidents', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, title: 'Tentative d\'intrusion', severity: 'CRITICAL', status: 'open' },
            { id: 2, title: 'Phishing détecté', severity: 'HIGH', status: 'investigating' }
        ]
    });
});
// POST /api/blockchain/create-policy
router.post('/create-policy', (req, res) => {
    const { name, description, policyHash, expiresAt } = req.body;
    res.json({
        success: true,
        message: 'Politique créée avec succès !',
        data: {
            id: Date.now(),
            name,
            description,
            policyHash,
            expiresAt,
            createdAt: new Date().toISOString()
        }
    });
});
// POST /api/blockchain/report-incident
router.post('/report-incident', (req, res) => {
    const { title, description, severity } = req.body;
    res.json({
        success: true,
        message: 'Incident signalé avec succès !',
        data: {
            id: Date.now(),
            title,
            description,
            severity,
            status: 'NEW',
            reportedAt: new Date().toISOString()
        }
    });
});
exports.default = router;
