const router = require('express').Router();
const { Book, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findAll();

        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Review
                }
            ]
        });

        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newBook = await Book.create({ ...req.body });
        res.json(newBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delBook = Book.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (delBook) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;