const sequelize = require('../config/connection.js');
const seedUsers = require('./userSeeds.js');
const seedPosts = require('./postSeeds.js');
const seedComments = require('./commentSeeds');

const seed = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log('----- USERS SEEDED -----');

  await seedPosts();
  console.log('----- POSTS SEEDED -----');

  await seedComments();
  console.log('----- COMMENTS SEEDED -----');

  // exit out of async operation
  process.exit(0);
};

seed();
