const router = require('express').Router();

router.get("/", (req, res) =>
{
    res.render("homepage", { logged_in: req.session.LoggedIn });
});

module.exports = router;