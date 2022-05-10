const router = require('express').Router();
const { Reader, Review } = require('../models');

router.get('/', async (req, res) => {
    try {
        const reviewData = await Reader.findAll( {
            where: {
                user_id: req.session.user_id
            }
        });

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.render('dashboard', {reviews, logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;