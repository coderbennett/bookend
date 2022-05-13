const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {};

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reader',
                key: 'id',
            },
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;