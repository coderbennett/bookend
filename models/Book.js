const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {};

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
            unique: true
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    }
)