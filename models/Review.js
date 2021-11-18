const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init ({
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    reviewTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [20, 200]
        }
    },
    imdbId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Reviews;