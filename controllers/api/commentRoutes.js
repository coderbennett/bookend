const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        if (!commentData) {
            res.status(404).json({ message: 'No comment '})
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.body,
            reader_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id.'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!commentData) {
            res.status(404).json({message: 'No comment was found with this id.'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;