const router = require('express').Router()

const readerRoutes = require('./readerRoutes')

router.use('/readers', readerRoutes);

module.exports = router;