const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {

    static function(body, models) {
      return models.Post.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          }
        })
      })
    }
  // static upvote(body, models) {
  //   return models.Vote.create({
  //     user_id: body.user_id,
  //     post_id: body.post_id 
  //   }).then(() => {
  //     return Post.findOne({
  //       where: {
  //         id: body.post_id
  //       },
  //       attributes: [
  //         "id",
  //         "post_url",
  //         "title",
  //         "created_at",
  //         // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
  //         [
  //             sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
  //             'vote_count'
  //         ]
  //       ]
  //     });
  //   });
  // }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
