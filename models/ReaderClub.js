const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReaderClub extends Model {};

ReaderClub.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        reader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reader',
                key: 'id'
            }
        },
        club_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'club',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'readerclub'
    }
);

module.exports = ReaderClub;