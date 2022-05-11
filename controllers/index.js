const router = require('express').Router()

const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;