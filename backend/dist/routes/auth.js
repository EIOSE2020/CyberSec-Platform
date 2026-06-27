"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// REGISTER (Créer un compte)
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, department } = req.body;
        // Vérifier si l'utilisateur existe
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        }
        // Hasher le mot de passe
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Créer l'utilisateur
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                firstName,
                lastName,
                department,
                role: 'USER'
            }
        });
        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
});
// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Trouver l'utilisateur
        const user = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Vérifier le mot de passe
        const isValidPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Générer le token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'mon_super_secret', { expiresIn: '7d' });
        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    department: user.department
                }
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});
// GET CURRENT USER
router.get('/me', auth_1.authenticate, async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                department: true,
                isActive: true,
                createdAt: true
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to get user'
        });
    }
});
// LOGOUT (côté client, on supprime le token)
router.post('/logout', auth_1.authenticate, async (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});
exports.default = router;
