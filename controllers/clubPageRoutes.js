const router = require('express').Router();
const { Club, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allClubs = await Club.findAll();
        res.render('homepage', {
            layout: 'main',
            allClubs,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const clubData = await Club.findOne({
            where: {id: req.params.id}
        });

        const club = clubData.get({plain: true});
        res.render('clubpage', {
            layout: 'main',
            club: club,
            logged_in: req.session.LoggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;