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