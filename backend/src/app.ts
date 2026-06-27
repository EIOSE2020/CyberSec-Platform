import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

// Importer les routes
import authRoutes from './routes/auth';
import blockchainRoutes from './routes/blockchainRoutes';
import zeroTrustRoutes from './routes/zeroTrustRoutes';
import xdrRoutes from './routes/xdrRoutes';
import soarRoutes from './routes/soarRoutes';
import siemRoutes from './routes/siemRoutes';
import threatHuntingRoutes from './routes/threatHuntingRoutes';
import complianceRoutes from './routes/complianceRoutes';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const execAsync = promisify(exec);

// ============================================
// MIDDLEWARE (ordre important)
// ============================================

// 1. CORS - DOIT être avant toutes les routes
app.use(cors({
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
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 3. Parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  } catch (error: any) {
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
app.use('/api/auth', authRoutes);

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
import { authenticate } from './middleware/auth';

app.use('/api/blockchain', authenticate, blockchainRoutes);
app.use('/api/zerotrust', authenticate, zeroTrustRoutes);
app.use('/api/xdr', authenticate, xdrRoutes);
app.use('/api/soar', authenticate, soarRoutes);
app.use('/api/siem', authenticate, siemRoutes);
app.use('/api/threathunting', authenticate, threatHuntingRoutes);
app.use('/api/compliance', authenticate, complianceRoutes);
app.use('/api/admin', authenticate, adminRoutes);

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export default app;