const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Admin123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@cybersec.com' },
    update: {},
    create: {
      email: 'admin@cybersec.com',
      passwordHash: hash,
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'System',
      department: 'IT Security',
      isActive: true
    }
  });
  console.log('✅ Admin créé:', user.email);
}

main()
  .catch(e => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });