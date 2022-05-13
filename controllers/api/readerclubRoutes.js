const router = require('express').Router();
const { ReaderClub, Club } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        let club_id = req.body.club_id
        if(club_id === 0) {
            const clubData = await Club.findAll();
            const clubs = clubData.map((club) => club.get({plain:true}));
            club_id = clubs.length;
        }

        const readerClubData = await ReaderClub.create({
            club_id,
            reader_id: req.session.user_id
        });
        res.status(200).json(readerClubData);
    } catch (err) {
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