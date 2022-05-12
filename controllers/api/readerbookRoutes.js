const router = require('express').Router();
const { ReaderBook } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const favoriteBookData = await ReaderBook.create({
            book_id: req.body.book_id,
            reader_id: req.session.user_id
        });
        res.status(200).json(favoriteBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const favoriteBookData = await ReaderBook.destroy({
            where: {
                book_id: req.params.id,
                reader_id: req.session.user_id
            }
        });

        if (!favoriteBookData) {
            res.status(404).json({ message: 'No favorite book data with this id!'});
            return;
        }

        res.status(200).json(favoriteBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;