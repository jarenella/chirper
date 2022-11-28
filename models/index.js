const User = require('./User');
const Post = require('./Post');
const Follower = require('./Follower');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.belongsToMany(User, {
//   as: 'followed_user',
//   through: 'follower'
// });

module.exports = { User, Post, Follower };
