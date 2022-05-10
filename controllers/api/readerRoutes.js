const router = require('express').Router();
const { Reader } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const readerData = await Reader.findAll();

        res.status(200).json(readerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const readerData = await Reader.findByPk(req.params.id);

        res.status(200).json(readerData);
    } catch (err) {
        res.status(500).json(err);
    }
});
