// Bringing in the blog-seed.js,comment-seed.js,user-seed.js
const seedBlogs = require('./blog-seed');
const seedComments = require('./comment-seed');
const seedUsers = require('./user-seed');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('==The DB is synced==');

  await seedUsers();
  console.log('==The users is seeded==');

  await seedBlogs();
  console.log('==The blogs are seeded==');

  await seedComments();
  console.log('==The comments are seeded==');

  process.exit(0);
};

seedAll();
