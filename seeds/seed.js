const sequelize = require('../config/connection');
const { Reader } = require('../models');
const { Book } = require('../models');
const { Club } = require('../models');
const { ReaderBook } = require('../models');

const readerData = require('./readerData.json');
const bookData = require('./bookData.json');
const clubData = require('./clubData.json');
const favoriteBookData = require('./favoriteBooks.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
    
        await Reader.bulkCreate(readerData, {
            individualHooks: true,
            returning: true
        });
    
        await Club.bulkCreate(clubData);
    
        await Book.bulkCreate(bookData);

        await ReaderBook.bulkCreate(favoriteBookData);
    
        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

module.exports = seedDatabase;