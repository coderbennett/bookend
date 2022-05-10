const router = require('express').Router();
const { Review, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            include: [{ model: Comment }]
        });

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});