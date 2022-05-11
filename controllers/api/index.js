const router = require('express').Router()

const readerRoutes = require('./readerRoutes');
const commentRoutes = require('./commentRoutes');
const clubRoutes = require('./clubRoutes');
const reviewRoutes = require('./reviewRoutes');
const bookRoutes = require('./bookRoutes');
const readerbookRoutes = require('./readerbookRoutes');

router.use('/reader', readerRoutes);
router.use('/comment', commentRoutes);
router.use('/club', clubRoutes);
router.use('/review', reviewRoutes);
router.use('/book', bookRoutes);
router.use('/favorites', readerbookRoutes);

module.exports = router;