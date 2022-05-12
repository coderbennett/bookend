const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const markdown = require('markdown');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reader',
                key: 'id',
            },
        },
        review_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'review',
                key: 'id',
            },
        }
    },
    {
        hooks: {
            beforeCreate: (newComment) => {
                newComment.body =  markdown.parse(newComment.body);
                return newComment;
            },
            beforeUpdate: (updatedComment) => {
                updatedComment.body = markdown.parse(updatedComment.body);
                return updatedComment;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;