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

router.get('/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                }
            ]
        });

        if (!reviewData) {
            res.status(404).json({message: "No review with this id was found."});
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});