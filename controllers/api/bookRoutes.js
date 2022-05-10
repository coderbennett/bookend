const router = require('express').Router();
const { Book } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll();

        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
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

module.exports = router;