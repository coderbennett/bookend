const router = require('express').Router();
const { Book, Reader, Review } = require('../models');

router.get('/', async (req, res) => {
    try {
        console.log(req.session);
        const reviewData = await Review.findAll( {
            where: {
                reader_id: req.session.user_id
            }
        });

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.render("dashboard", { reviews, logged_in: req.session.LoggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;