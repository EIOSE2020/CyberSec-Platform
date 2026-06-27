"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../config/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/admin/users - Liste tous les utilisateurs (admin only)
router.get('/users', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN']), async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                department: true,
                isActive: true,
                createdAt: true,
                lastLoginAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: users
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
});
// GET /api/admin/stats - Statistiques (admin only)
router.get('/stats', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN']), async (req, res) => {
    try {
        const [totalUsers, totalIncidents, totalThreats] = await Promise.all([
            prisma_1.prisma.user.count(),
            prisma_1.prisma.incident.count(),
            prisma_1.prisma.threatIntel.count()
        ]);
        res.json({
            success: true,
            data: {
                totalUsers,
                totalIncidents,
                totalThreats,
                activeUsers: await prisma_1.prisma.user.count({ where: { isActive: true } })
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stats'
        });
    }
});
// PUT /api/admin/users/:id - Mettre à jour un utilisateur (admin only)
router.put('/users/:id', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive, department, firstName, lastName } = req.body;
        const user = await prisma_1.prisma.user.update({
            where: { id },
            data: {
                role,
                isActive,
                department,
                firstName,
                lastName
            },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                department: true,
                isActive: true
            }
        });
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update user'
        });
    }
});
exports.default = router;
