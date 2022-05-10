const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Reader extends Model {
    checkPassword(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    }
};

Reader.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
    },
    {
        hooks: {
            beforeCreate: async (newReaderData) => {
                newReaderData.password = await bcrypt.hash(newReaderData.password, 10);
                return newReaderData;
            },
            beforeUpdate: async (updateReaderData) => {
                updateReaderData.password = await bcrypt.hash(updateReaderData.password, 10);
                return updateReaderData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'reader'
    }
);

module.exports = Reader;