const { Model, DataTypes } = require('sequelize');

class ReaderBook extends Model {};

ReaderBook.init(
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
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'readerbook'
    }
);

module.exports = ReaderBook;