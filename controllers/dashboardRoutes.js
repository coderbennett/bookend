const router = require('express').Router();
const { Book, Reader, Review, ReaderBook } = require('../models');

router.get('/', async (req, res) => {
    try {
        console.log(req.session);
        const reviewData = await Review.findAll( {
            where: {
                reader_id: req.session.user_id
            }
        });

        const favoriteBookData = await Reader.findByPk(req.session.user_id, {
            include: {
                model: Book
            }
        });

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        const favorites = favoriteBookData.get({plain:true});

        console.log(favorites);

        res.render("dashboard", { reviews, favorites, logged_in: req.session.LoggedIn });
    } catch (err) {
        console.error(err);
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
                review,
            });
        } else { 
            res.status(400).end();
        }
    } catch (err) {
        res.redirect('/dashboard');
    }
});

module.exports = router;