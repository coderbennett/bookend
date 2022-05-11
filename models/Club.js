const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Club extends Model {};

Club.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        reader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reader',
                key: 'id'
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'club'
    }
);

module.exports = Club;