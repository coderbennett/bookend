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

router.post('/', async (req, res) => {
    try {
        const reviewData = await Review.create({
            title: req.body.title,
            body: req.body.body,
            reader_id: req.session.user_id,
            book_id: req.body.id
        });

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const reviewData = await Review.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!reviewData) {
            res.status(404).json({ message: 'No review could be found with this id.'});
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
                reader_id: req.session.user_id
            }
        });

        if(!reviewData) {
            res.status(404).json()
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;