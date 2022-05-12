const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ClubInvites extends Model {};

ClubInvites.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        target_reader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reader',
                key: 'id'
            }
        },
        sender_reader_id: {
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
        modelName: 'clubinvites'
    }
);

module.exports = ClubInvites;