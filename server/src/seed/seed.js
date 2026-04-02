require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDB } = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@nirbhaya.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123';

  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' });
    console.log('Seeded admin user');
  }

  console.log('Seed completed');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
