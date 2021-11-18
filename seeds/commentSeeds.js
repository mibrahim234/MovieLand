const sequelize = require('../config/connection.js');
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 2,
        comment_content: 'Convinced by your review, buying tickets now!',
    },
    {
        user_id: 2,
        post_id: 1,
        comment_content: '10/10, nice review!',
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
