const router = require('express').Router();
const { Reader, Club, Book, Review, Comment } = require('../models');

router.get("/", async (req, res) =>
{
    try
    {
        const clubData = await Club.findAll();
        const clubs = clubData.map((club) => club.get());
        
        res.render("homepage", { clubs: clubs, logged_in: req.session.LoggedIn });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/book/:id", async (req, res) =>
{
    const bookData = await Book.findByPk(req.params.id, {
        include: [{ model: Review, include: [{ model: Comment, include: Reader }] }] // There be dragons within this nested include!
    });

    if (!bookData) {
        return res.status(404).json({message: 'No book found with this id.'});
    }

    const book = bookData.get({ plain: true });
    res.render("book", { book: book, logged_in: req.session.LoggedIn });
});

module.exports = router;