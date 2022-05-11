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

router.get('/edit/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id);
        if (reviewData) {
            const review = reviewData.get({ plain: true });
            console.log(review);
            res.render('edit-review', {
                layout: 'dashboard',
                review,
            });
        } else { 
            res.status(400).end();
        }
    } catch (err) {
        res.redirect('dashboard');
    }
});

module.exports = router;