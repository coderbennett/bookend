const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Club extends Model {};

Club.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
);

module.exports = Club;