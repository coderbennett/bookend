const router = require('express').Router();
const { Club, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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

router.get('/new', withAuth, async (req, res) => {
        res.render('newclub', { logged_in: req.session.LoggedIn});
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const clubData = await Club.findByPk(req.params.id, {
            include: Book
        });

        const club = clubData.get({plain: true});
        
        const isOwner = (req.session.user_id === club.owner_id);

        res.render('clubpage', {
            layout: 'main',
            club: club,
            isOwner,
            logged_in: req.session.LoggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;