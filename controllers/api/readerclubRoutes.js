const router = require('express').Router();
const { ReaderClub, Club } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const readerClubData = await ReaderClub.create({
            club_id: req.body.club_id,
            reader_id: req.session.user_id
        });

        res.status(200).json(readerClubData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
    try {
        const readerClubData = await ReaderClub.findAll();

        res.status(200).json(readerClubData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;