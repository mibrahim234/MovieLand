const sequelize = require('../config/connection.js');
const { Post } = require('../models');

const postData = [
    {
        user_id: 1,
        post_title: 'Eternals',
        movie_content: 'I was amazed by this movie. I was slightly apprehensive about watching this film after seeing the critics reviews but I made my way to the cinema regardless! And boy I am glad I did!',
    },
    {
        user_id: 2,
        post_title: 'The Avengers',
        movie_content: 'This film has everything you want in a team up super hero film from awesome action sequences to great characters but still has some noticeable flaws.',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;