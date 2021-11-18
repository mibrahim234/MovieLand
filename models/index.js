const User = require ('./User');
const Review = require('./Review');

// create associations
User.hasMany(Review, {
    foreignKey: 'user_id'
  });

Review.belongsTo(User, {
    foreignKey:
    {allowNull: false}
  });

  Review.hasMany(models.Comment, {})

  module.exports = { User, Review };