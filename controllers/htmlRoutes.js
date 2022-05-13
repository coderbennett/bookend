const router = require('express').Router();
const { Reader, Club, Book, Review, Comment, ReaderBook } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) =>
{
    try
    {
        const clubData = await Club.findAll( {
            where: {
                reader_id: null
            }
        } );
        const clubs = clubData.map((club) => club.get());
        
        res.render("homepage", { clubs: clubs, logged_in: req.session.LoggedIn });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/book/:id", withAuth, async (req, res) =>
{
    const bookData = await Book.findByPk(req.params.id, {
        include: [{ model: Review, include: [{ model: Comment, include: Reader }, { model: Reader }] }] // There be dragons within this nested include!
    });

    if (!bookData) {
        return res.status(404).json({message: 'No book found with this id.'});
    }

    const book = bookData.get({ plain: true });

    const bookFavoriteCount = await ReaderBook.count(
        {
            where:
            {
                book_id: req.params.id
            }
        }
    )

    const bookFavoriteByReaderData = await ReaderBook.findOne(
        {
            where:
            {
                reader_id: req.session.user_id,
                book_id: req.params.id
            }
        }
    )
    console.log(book.reviews);
    const isFavorite = bookFavoriteByReaderData ? true : false;

    res.render("book", { book: book, bookFavoriteCount: bookFavoriteCount, isFavorite: isFavorite, logged_in: req.session.LoggedIn });
});

module.exports = router;