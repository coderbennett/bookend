const Book = require('./Book');
const Club = require('./Club');
const Comment = require('./Comment');
const Reader = require('./Reader');
const Review = require('./Review');
const ReaderBook = require('./ReaderBook')

Book.belongsTo(Club, {
    foreignKey: 'club_id',
    onDelete: 'CASCADE',
});

Book.hasMany(Review, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});

// Book.belongsToMany(Reader, {
    
// })

Club.hasMany(Book, {
    foreignKey: 'club_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Reader, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
});

// Reader.hasMany(Book, {

// })

Reader.hasMany(Review, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
});

Reader.hasMany(Comment, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Reader, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Book, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});

Review.hasMany(Comment, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE',
});

Reader.hasMany(Book, {
     through: {
         model: ReaderBook,
         unique: false
        }
    });

Book.belongsToMany(Reader, {
     through: {
         model: ReaderBook,
         unique: false
        }
    });;

module.exports = {
    Book,
    Club,
    Comment,
    Reader,
    Review,
    ReaderBook
};