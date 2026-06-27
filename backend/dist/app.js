"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const child_process_1 = require("child_process");
const util_1 = require("util");
// Importer les routes
const auth_1 = __importDefault(require("./routes/auth"));
const blockchainRoutes_1 = __importDefault(require("./routes/blockchainRoutes"));
const zeroTrustRoutes_1 = __importDefault(require("./routes/zeroTrustRoutes"));
const xdrRoutes_1 = __importDefault(require("./routes/xdrRoutes"));
const soarRoutes_1 = __importDefault(require("./routes/soarRoutes"));
const siemRoutes_1 = __importDefault(require("./routes/siemRoutes"));
const threatHuntingRoutes_1 = __importDefault(require("./routes/threatHuntingRoutes"));
const complianceRoutes_1 = __importDefault(require("./routes/complianceRoutes"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const execAsync = (0, util_1.promisify)(child_process_1.exec);
// ============================================
// MIDDLEWARE (ordre important)
// ============================================
// 1. CORS - DOIT être avant toutes les routes
app.use((0, cors_1.default)({
    origin: [
        'https://cybersec2020.netlify.app',
        'http://localhost:3000',
        'https://cybersec-backend-hhg5.onrender.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    exposedHeaders: ['Content-Type', 'Authorization']
}));
// 2. Sécurité
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// 3. Parser JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ============================================
// ROUTES D'INITIALISATION
// ============================================
// Route pour initialiser la base de données (migrations)
app.get('/api/init-db', async (req, res) => {
    try {
        console.log('🔄 Exécution des migrations Prisma...');
        const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
        console.log('✅ Migrations exécutées:', stdout);
        res.json({
            success: true,
            message: 'Migrations exécutées avec succès',
            output: stdout,
            errors: stderr
        });
    }
    catch (error) {
        console.error('❌ Erreur migrations:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            output: error.stdout,
            errors: error.stderr
        });
    }
});
// ============================================
// ROUTES PRINCIPALES
// ============================================
// Routes publiques
app.use('/api/auth', auth_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '5.0.0',
        modules: {
            auth: true,
            blockchain: true,
            zeroTrust: true,
            xdr: true,
            soar: true,
            siem: true,
            threatHunting: true,
            compliance: true
        }
    });
});
// Routes sécurisées
const auth_2 = require("./middleware/auth");
app.use('/api/blockchain', auth_2.authenticate, blockchainRoutes_1.default);
app.use('/api/zerotrust', auth_2.authenticate, zeroTrustRoutes_1.default);
app.use('/api/xdr', auth_2.authenticate, xdrRoutes_1.default);
app.use('/api/soar', auth_2.authenticate, soarRoutes_1.default);
app.use('/api/siem', auth_2.authenticate, siemRoutes_1.default);
app.use('/api/threathunting', auth_2.authenticate, threatHuntingRoutes_1.default);
app.use('/api/compliance', auth_2.authenticate, complianceRoutes_1.default);
app.use('/api/admin', auth_2.authenticate, admin_1.default);
// ============================================
// GESTION DES ERREURS
// ============================================
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
});
// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});
// ============================================
// DÉMARRAGE
// ============================================
app.listen(PORT, () => {
    console.log('🚀 Backend démarré sur http://localhost:' + PORT);
    console.log('📊 Health: http://localhost:' + PORT + '/api/health');
    console.log('🔐 Auth: http://localhost:' + PORT + '/api/auth');
    console.log('🗄️ Init DB: http://localhost:' + PORT + '/api/init-db');
    console.log('⛓️ Blockchain: http://localhost:' + PORT + '/api/blockchain/stats');
    console.log('🛡️ Zero Trust: http://localhost:' + PORT + '/api/zerotrust/status');
    console.log('🔍 XDR: http://localhost:' + PORT + '/api/xdr/alerts');
    console.log('🤖 SOAR: http://localhost:' + PORT + '/api/soar/playbooks');
    console.log('📊 SIEM: http://localhost:' + PORT + '/api/siem/stats');
    console.log('🔎 Threat Hunting: http://localhost:' + PORT + '/api/threathunting/queries');
    console.log('📋 Compliance: http://localhost:' + PORT + '/api/compliance/status');
});
exports.default = app;
