const router = require('express').Router();
const { Reader, Book, Review, Comment } = require('../models');

router.get("/", (req, res) =>
{
    res.render("homepage", { logged_in: req.session.LoggedIn });
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