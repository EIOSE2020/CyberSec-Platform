const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed en cours...');

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cybersec.com' },
    update: {},
    create: {
      email: 'admin@cybersec.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'System',
      department: 'IT Security',
      isActive: true
    }
  });
  console.log('✅ Admin créé:', admin.email);

  const analystPassword = await bcrypt.hash('Analyst123!', 10);
  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@cybersec.com' },
    update: {},
    create: {
      email: 'analyst@cybersec.com',
      passwordHash: analystPassword,
      role: 'SECURITY_ANALYST',
      firstName: 'Sarah',
      lastName: 'Connor',
      department: 'SOC',
      isActive: true
    }
  });
  console.log('✅ Analyste créé:', analyst.email);

  console.log('🌱 Seed terminé !');
}

main()
  .catch(e => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });