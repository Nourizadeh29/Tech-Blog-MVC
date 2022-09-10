const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// Must create associations of the users, blogs and the comments

// The user can have many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// The blog can only belong to one user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// The user's comments belong to the user only
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


// The blog itself has comments that belong to it 
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

// A user can have multiple comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Blog, Comment };
