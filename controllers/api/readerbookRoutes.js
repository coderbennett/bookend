const router = require('express').Router();
const { ReaderBook } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const favoriteBookData = await ReaderBook.create(req.body);
        res.status(200).json(favoriteBookData);
    } catch (err) {
        res.status(400).json(err);
    }
});