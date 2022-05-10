const router = require('express').Router();
const { Club, Book } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const clubData = await Club.findAll({
            include: [{ model: Book }]
        });

        res.status(200).json(clubData);
    } catch (err) {
        res.status(500).json(err);
    }
});