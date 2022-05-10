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

router.get('/:id', async (req, res) => {
    try {
        const clubData = await Club.findByPk(req.params.id, {
            include: [{ model: Book }]
        });

        if (!clubData) {
            res.status(404).json({message: 'No club found with this id.'});
        }

        res.status(200).json(clubData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;