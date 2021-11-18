const sequelize = require('../config/connection.js');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        email:'carl1@gmail.com',
        username: 'hungryman',
        password: 'password1'
    },
    {
        email:'ben10@gmail.com',
        username: 'spidermonkey',
        password: 'jumpman',
    },
];
//Create and insert multiple instances in bulk.
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;