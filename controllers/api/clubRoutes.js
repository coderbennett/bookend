const router = require('express').Router();
const { Club, Book, ReaderClub } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const clubData = await Club.findAll({
            include: [{ model: Book }]
        });

        res.status(200).json(clubData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
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

router.post('/', withAuth, async (req, res) => {
    // console.log(req.body);
    try {
        const newClub = await Club.create({ ...req.body, reader_id: req.session.user_id, owner_id: req.session.user_id });
        // console.log(newClub);
        res.json(newClub);
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delClub = Club.destroy({
            where: {
                id: req.params.id
            }
        });
        if(delClub) {
            res.status(200).end()
        } else {
            res.status(400).end()
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;