const sequelize = require('../config/connection');
const { Reader } = require('../models');
const { Book } = require('../models');
const { Club } = require('../models');

const readerData = require('./readerData.json');
const bookData = require('./bookData.json');
const clubData = require('./clubData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Reader.bulkCreate(readerData, {
        individualHooks: true,
        returning: true
    });

    await Book.bulkCreate(bookData);

    await Club.bulkCreate(clubData);

    process.exit(0);
}

seedDatabase();