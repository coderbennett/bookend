const Book = require('./Book');
const Club = require('./Club');
const Comment = require('./Comment');
const Reader = require('./Reader');
const Review = require('./Review');

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