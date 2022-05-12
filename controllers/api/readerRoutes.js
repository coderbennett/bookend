const router = require('express').Router();
const { Reader } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const readerData = await Reader.findAll();

        res.status(200).json(readerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const readerData = await Reader.findByPk(req.params.id);

        res.status(200).json(readerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Used for signup
router.post('/', async (req, res) => {
    try {
        const readerData = await Reader.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = readerData.id;
            req.session.LoggedIn = true;

            res.status(200).json(readerData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const readerData = await Reader.findOne({ where: { email: req.body.email }});

        if (!readerData) {
            res.status(400).json({message: "Invalid email or password. Please try again."});
            return;
        }

        const validPassword = await readerData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: "Invalid email or password. Please try again."});
            return;
        }

        req.session.save(() => {
            req.session.user_id = readerData.id;
            req.session.LoggedIn = true;
            res.json({reader: readerData, message: "You are now logged in."});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.LoggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;