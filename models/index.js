const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

// User - Post/Comment relations
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'post_author',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comment_author',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'post_author',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'comment_author',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'post_comments',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post_comments',
});

module.exports = { User, Post, Comment };
