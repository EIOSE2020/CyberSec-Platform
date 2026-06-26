import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

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

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Routes publiques
app.use('/api/auth', authRoutes);
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

// Routes sécurisées (à protéger avec authenticate)
import { authenticate } from './middleware/auth';

// Appliquer l'authentification à toutes les routes /api/*
app.use('/api/blockchain', authenticate, blockchainRoutes);
app.use('/api/zerotrust', authenticate, zeroTrustRoutes);
app.use('/api/xdr', authenticate, xdrRoutes);
app.use('/api/soar', authenticate, soarRoutes);
app.use('/api/siem', authenticate, siemRoutes);
app.use('/api/threathunting', authenticate, threatHuntingRoutes);
app.use('/api/compliance', authenticate, complianceRoutes);
app.use('/api/admin', authenticate, adminRoutes);

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

app.listen(PORT, () => {
  console.log(' Backend démarré sur http://localhost:' + PORT);
  console.log(' Health: http://localhost:' + PORT + '/api/health');
  console.log(' Auth: http://localhost:' + PORT + '/api/auth');
  console.log(' Blockchain: http://localhost:' + PORT + '/api/blockchain/stats');
  console.log(' Zero Trust: http://localhost:' + PORT + '/api/zerotrust/status');
  console.log(' XDR: http://localhost:' + PORT + '/api/xdr/alerts');
  console.log(' SOAR: http://localhost:' + PORT + '/api/soar/playbooks');
  console.log(' SIEM: http://localhost:' + PORT + '/api/siem/stats');
  console.log(' Threat Hunting: http://localhost:' + PORT + '/api/threathunting/queries');
  console.log(' Compliance: http://localhost:' + PORT + '/api/compliance/status');
});

export default app;
