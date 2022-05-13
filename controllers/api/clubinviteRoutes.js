const router = require('express').Router();
const { ClubInvites } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const inviteData = await ClubInvites.findAll();
        res.status(200).json(inviteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const inviteData = await ClubInvites.findByPk(req.params.id);

        if(!inviteData) {
            res.status(404).json({message: 'No invite here.'});
        }

        res.status(200).json(inviteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const inviteData = await ClubInvites.create({
            target_reader_id: req.body.target_reader,
            sender_reader_id: req.session.user_id,
            club_id
        });

        res.status(200).json(inviteData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const inviteData = await ClubInvites.destroy({
            where: {
                id: req.params.id,
                target_reader_id: req.session.user_id
            }
        });

        if (!inviteData) {
            res.status(404).json(inviteData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;