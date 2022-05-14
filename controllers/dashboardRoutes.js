const router = require('express').Router();
const { Book, Reader, Review, ClubInvites, Club, ReaderClub } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.findAll( {
            where: {
                reader_id: req.session.user_id
            }
        });

        const favoriteBookData = await Reader.findByPk(req.session.user_id, {
            include: [
                { model: Book }, { model: Club}
            ]
        });

        const inviteData = await ClubInvites.findAll( {
            where: {
                target_reader_id: req.session.user_id
            },
            include: [ { model: Club }, { model: Reader } ] 
        });

        const invites = inviteData.map((invite) => invite.get({ plain: true}));

        const hasInvites = invites.length > 0;

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        const favorites = favoriteBookData.get({plain:true});

        res.render("dashboard", { reviews, favorites, invites, hasInvites, logged_in: req.session.LoggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id);
        if (reviewData) {
            const review = reviewData.get({ plain: true });
            res.render('edit-review', {
                review,
                logged_in: req.session.LoggedIn
            });
        } else { 
            res.status(400).end();
        }
    } catch (err) {
        res.redirect('/dashboard');
    }
});

module.exports = router;